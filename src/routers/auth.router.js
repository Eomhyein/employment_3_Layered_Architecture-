// src/routers/auth.router.js
// 1. 회원가입 API 만들기
// POST: /auth/sign-up
import express from 'express';
import { prisma } from '../utils/prisma.util.js'; // connectDb 연결
import bcrypt from 'bcrypt'; // 1-8 bcrypt 리팩토링
import jwt from 'jsonwebtoken'; 
import { authConstants } from '../constants/auth.constant.js'; // 토큰 연결
import AuthController from '../controllers/auth.controller.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { AuthService } from '../services/auth.service.js';

const router = express.Router();

const usersRepository = new UsersRepository(prisma);
const authService = new AuthService(usersRepository);
const authController = new AuthController(authService);

// 1. 사용자 회원가입 API
router.post('/auth/sign-up', authController.signUp);

// 2. 로그인 API
// POST: /auth/sign-in
router.post('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 2.1 로그인 정보 중 하나라도 빠진 경우 처리
    if (!email) {
      return res.status(400).json({ message: '이메일을 입력해 주세요.' });
    }
    if (!password) {
      return res.status(400).json({ message: '비밀번호을 입력해 주세요.' });
    }

    // 2.2 이메일 형식에 맞지 않는 경우
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: '이메일 형식이 올바르지 않습니다.' });
    }
    // 2.3 이메일로 조회가 불가하거나 비밀번호가 다를 경우
    const user = await prisma.users.findUnique({ where: { email: email } });

    // 2-4 입력받은 사용자의 비밀번호와 데이터베이스에 저장된 비밀번호를 비교합니다.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: '인증 정보가 유효하지 않습니다.' });
    }
    const secretKey = process.env.SECRET_KEY;
    // 2-5 로그인에 성공하면, 사용자의 id를 바탕으로 토큰을 생성합니다.
    const token = jwt.sign(
      {
        id: user.id,
      },
      authConstants.secretKey,
      {expiresIn:'12h'} // 2-5 토큰 만료 시간을 12시간으로 설정
    );
    
    return res.status(200).json({ accessToken: token, message: '로그인 성공' });
  } catch (error) {
    next(error); // 에러가 발생하면 에러 핸들러로 전달합니다.
  }
});


export default router;