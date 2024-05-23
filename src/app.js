// src/app.js
import { express } from 'express';
import { errorHandler } from './middlewares/error-handler.middleware';

const app = express();

// 기타 미들웨어
app.use(express.json());

// 라우터 설정
// 예: app.use('/api/resumes', resumesRouter);
// ... 다른 라우터들

// 에러 핸들링 미들웨어
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;