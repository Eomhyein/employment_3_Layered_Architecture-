// src/routers/resumes.router.js
import express from 'express';
import { prisma } from '../utils/prisma.util.js'; // connectDb 연결
import accessTokenMiddle from '../middlewares/require-access-token.middleware.js'; // 토큰 연결

const router = express.Router();

// 1. 이력서 생성 API
router.post('/resumes', accessTokenMiddle, async (req, res, next) => {
  try {
    // 1-1 제목, 자기소개 req.body로 전달 받는다.
    const { title, about_me } = req.body;

    // 제목, 자기소개 중 하나라도 빠진 경우
    if (!title) {
      return res.status(400).json({ message: '제목을 입력해 주세요.' });
    }
    if (!about_me) {
      return res.status(400).json({ message: '자기소개를 입력해 주세요.' });
    }
    // 자기소개 글자 수가 150자 보다 짧은 경우
    if (about_me.length < 150) {
      return res.status(400).json({ message: '자기소개는 150자 이상 작성해야 합니다.' });
    }

    // 사용자 id는 미들웨어를 통해 req.userId에 설정됨
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: '인증된 사용자가 아닙니다.' });
    }

    // 새로운 이력서 생성
    const newResume = await prisma.resume.create({
      data: {
        user_id: userId,
        title,
        about_me,
        status: 'APPLY', // 기본 상태 설정
      },
    });

    // 이력서 id, 작성자 id, 제목, 자기소개, 지원 상태, 생성일시, 수정일시를 반환합니다.
    return res.status(201).json({
      id: newResume.id,
      user_id: newResume.user_id,
      title: newResume.title,
      about_me: newResume.about_me,
      status: newResume.status,
      created_at: newResume.created_at,
      updated_at: newResume.updated_at,
      message: '새로운 이력서가 생성되었습니다.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

export default router;