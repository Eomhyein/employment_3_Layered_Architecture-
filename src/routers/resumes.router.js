// src/routers/resumes.router.js
import express from 'express';
import { prisma } from '../utils/prisma.util.js'; // connectDb 연결
import accessTokenMiddle from '../middlewares/require-access-token.middleware.js'; // 토큰 연결

const router = express.Router();

// 1. 이력서 생성 API
router.post('/resumes', accessTokenMiddle, async (req, res, next) => {
  try {
    const { title, about_me } = req.body;

    // 1-1 제목, 자기소개 중 하나라도 빠진 경우
    if (!title) {
      return res.status(400).json({ message: '제목을 입력해 주세요.' });
    }
    if (!about_me) {
      return res.status(400).json({ message: '자기소개를 입력해 주세요.' });
    }
    // 1-2 자기소개 글자 수가 150자 보다 짧은 경우
    if (about_me.length < 150) {
      return res.status(400).json({ message: '자기소개는 150자 이상 작성해야 합니다.' });
    }

    // 1-3 사용자 id는 미들웨어를 통해 req.userId에 설정됨
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: '인증된 사용자가 아닙니다.' });
    }

    // 1-4 새로운 이력서 생성
    const newResume = await prisma.resume.create({
      data: {
        user_id: userId,
        title,
        about_me,
        status: 'APPLY', // 기본 상태 설정
      },
    });

    // 1-5 이력서 id, 작성자 id, 제목, 자기소개, 지원 상태, 생성일시, 수정일시를 반환합니다.
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
// 2. 이력서 목록 조회 API 내가 등록한 이력서 목록 조회
router.get('/resume', accessTokenMiddle, async (req, res, next) => {
  const userId = req.user.id;
  // 2-1 Query Parameters 정렬 조건 받기 기본값 'DESC'
  const { sortOrder = 'DESC' } = req.query;
  // 2-2 생성일시 기준 정렬 과거순(ASC), 최신순(DESC)으로 전달 받는다
      // 값이 없는 경우 최신순(DESC), 대소문자 구분 없이 동작
  const validSortOrder = sortOrder.toUpperCase() === 'ASC' ? 'asc' : 'desc';

  // 2-3 현재 로그인 한 사용자가 작성한 이력서 목록만 조회
    // DB에서 이력서 조회시 작성자 ID 일치
    // 정렬 조건에 따라 다른 결과 값 조회
    // 작성자 ID가 아닌 작성자 이름을 반환하기 위해 스키마에 정의 한 Relation을 활용해 조회


  // 일치하는 값이 없는 경우 빈 배열을 반환(StatusCode: 200)

  // 이력서id, 작성자 이름, 제목, 자기소개, 지원상태, 생성일시, 수정일시의 목록을 반환

});


export default router;