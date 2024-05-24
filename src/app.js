// src/app.js
import express from 'express';
import { errorHandler } from './middlewares/error-handler.middleware.js'; 
import { connectDb } from './utils/prisma.util.js'; // connectDb 연결
import AuthRouter from './routers/auth.router.js'; // 회원가입 라우터 연결

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use('/auth', [AuthRouter]); // 회원가입 라우터 연결

// 라우터 예시
// 예: app.use('/api/resumes', resumesRouter);
await connectDb();

app.use(errorHandler); // 에러 핸들링 미들웨어

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요');
});

export default app;