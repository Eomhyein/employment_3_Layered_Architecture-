// src/routers/auth.router.js
// 1. 회원가입 API 만들기
// POST: /auth/sign-up
import express from 'express';
import { prisma } from '../utils/prisma.util.js'; // connectDb 연결
import bcrypt from 'bcrypt'; // 1-5 bcrypt 리팩토링

const router = express.Router();
// 1. 사용자 회원가입 API
router.post('/sign-up', async (req, res, next) => {
  try {
  // 1-1. 이메일, 비밀번호, 이름을  req.body로 전달받는다.
    const{email, password, name} = req.body
    // 1-2. 동일한 이메일을 가진 사용자가 있는지 확인합니다.
    const isExistUser = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (isExistUser) {
      return res.status(400).json({message: '이미 가입 된 사용자입니다.'})
    }

    // 1-5 사용자 비밀번호를 암호화합니다
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1-3 Users 테이블에 이메일, 비밀번호, 이메일을 이용해 사용자를 생성한다.
    const users = await prisma.users.create({
      data: {
        email, 
        password : hashedPassword, // 1-5 암호화된 비밀번호를 저장한다 
        name,
      },
    });

    // 1-4 사용자 정보 반환(id, email, name, role, created_at, update_at)
    return res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      user: {
        id: users.id,
        email,
        name,
        role: users.role,
        created_at: users.created_at,
        updated_at: users.updated_at,
      },
    });
  } catch (error) {
    next(error); // 에러가 발생하면 에러 핸들러로 전달합니다.
  }
});

export default router;