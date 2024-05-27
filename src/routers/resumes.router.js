import express from 'express';
import { prisma } from '../utils/prisma.util.js'; // connectDb 연결
import { requestAccessToken } from '../middlewares/require-access-token.middleware.js'; // 토큰 연결

const router = express.Router();

// 1. 이력서 생성 API
router.post('resumes/', requestAccessToken, async (req, res, next) => {
  // 1-1 제목, 자기소개 req.body로 전달 받는다.
  const{title, about_me} =req.body;

  // 제목, 자기소개 중 하나라도 빠진 경우
  if (!title) {
    return res.status(400).json({message:'제목을 입력해 주세요.'});
  }
  if (!about_me) {
    return res.status(400).json({message: '자기소개를 입력해 주세요'});
  }
  // 자기소개 글자 수가 150자 보다 짧은 경우
  if (about_me.length < 150) {
    return res.status(400).json({message: '자기소개는 150자 이상 작성해야 합니다'});
  }
  const userId = req.userId;

  const newResume = await prisma.resume.create({
    data: {
      id: userId,
      title,
      about_me,
    }
  });

  // 이력서 id, 작성자 id, 제목, 자기소개, 지원 상태, 생성일시, 수정일시를 반환합니다.

})



export default router;