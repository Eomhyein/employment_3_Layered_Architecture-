// src/app.js
import express from 'express';
import { errorHandler } from './middlewares/error-handler.middleware.js';
import { connectDb } from './utils/prisma.util.js'; // connectDb 연결
import AuthRouter from './routers/auth.router.js'; // 1. 회원가입 라우터 연결
// import UsersRouter from './routers/users.router.js'; // 2. 로그인 라우터 연결
import cookieParser from 'cookie-parser'; // 쿠키
import dotenv from 'dotenv';

dotenv.config(); // .env 파일의 환경 변수를 로드합니다.

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser()); // 쿠키

app.use('/auth', AuthRouter); // 1. 회원가입 라우터 연결

app.use(errorHandler); // 에러 핸들링 미들웨어

// 라우터 예시
// 예: app.use('/api/resumes', resumesRouter);
async function startServer() {
  await connectDb(); // DB연결
  app.listen(PORT, () => {
    console.log(PORT, '포트로 서버가 열렸어요');
  });
}

startServer(); //서버시작

export default app;
