// src/middlewares/require-access-token.middleware.js
// 사용자 인증 AccessToken 인증 Middleware
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.util.js';

const accessTokenMiddle  = async (req, res, next) => {
  try {
    // 3-1. 내 정보를 보는 페이지 요청시-> 요청받은 access token을 헤더에서 보여준다.
    const authHeader = decodeURIComponent(req.headers["authorization"]);
    if (!authHeader) {
      return res.status(401).json({ message: '인증 정보가 없습니다.' });
    }

    // 3-2. req header에서 Authorization 토큰 값을 가져온다. 
    // AccessToken에 Bearer이 없으면 생기는 문제
    const [tokenType, token] = authHeader.split(' ');
    if (tokenType !== 'Bearer' || !token) {
      return res.status(401).json({ message: '지원하지 않는 인증 방식입니다.' });
    }

    // 3-3. 토큰을 확인한다.
    try {
      const decoded = jwt.verify(token, 'custom-secret-key');
      // 1)true면 요청한 페이지를 보여준다
      const user = await prisma.users.findUnique({ where: { id: decoded.id } });
      // 2) false면 메시지를 보여준다.
      if (!user) {
        return res.status(404).json({ message: '인증 정보와 일치하는 사용자가 없습니다.' });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: '인증 정보가 만료되었습니다.' });
      } else {
        return res.status(401).json({ message: '인증 정보가 유효하지 않습니다.' });
      }
    }
  } catch (error) {
    next(error);
  }
};

export default accessTokenMiddle;