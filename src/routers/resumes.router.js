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

    // 1-3 사용자 id는 미들웨어를 통해 req.user.id에 설정됨
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
router.get('/resumes', accessTokenMiddle, async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);// 사용자확인
    // 2-1 Query Parameters 정렬 조건 받기 기본값 'DESC'
    const { sort = 'DESC' } = req.query;
    // 2-2 생성일시 기준 정렬 과거순(ASC), 최신순(DESC)으로 전달 받는다 sort
      // 값이 없는 경우 최신순(DESC), 대소문자 구분 없이 동작
    const SortOrder = sort.toUpperCase() === 'ASC' ? 'asc' : 'desc';

    // 2-3 현재 로그인 한 사용자가 작성한 이력서 목록만 조회
      // DB에서 이력서 조회시 작성자 ID 일치하는지 확인
      // 정렬 조건에 따라 다른 결과 값 조회
      // 작성자 ID가 아닌 작성자 이름을 반환하기 위해 스키마에 정의 한 Relation을 활용해 조회
    const resumes = await prisma.resume.findMany({
      where: {user_id: userId},
      select: {
        id: true,
        user_id: true,
        title:  true,
        about_me: true,
        status: true,
        created_at: true,
        updated_at: true,
        user: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        created_at: SortOrder,
      }
    });

    // 2-4 일치하는 값이 없는 경우 빈 배열을 반환(StatusCode: 200)
    if(!resumes) {
      return res.status(200).json([]);
    }
    // 2-5 이력서id, 작성자 이름, 제목, 자기소개, 지원상태, 생성일시, 수정일시 반환
    const result = resumes.map(resume => ({
      id : resume.id,
      name: resume.user.name,
      title: resume.title,
      about_me: resume.about_me,
      status: resume.status,
      created_at: resume.created_at,
      updated_at: resume.updated_at
    }));
    return res.status(200).json({data: result});

  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 3. 이력서 상세 조회 API
router.get('/resumes/:id', accessTokenMiddle, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {id} = req.params;
    // 3-1 이력서 정보가 없는 경우 : 이력서가 존재하지 않습니다.
    if(!id) {
      return res.status(400).json({message:'이력서가 존재하지 않습니다.'});
    }
    // 3-2
    // 현재 로그인 한 사용자가 작성한 이력서만 조회
    // DB에서 이력서 조회시 이력서 ID, 작성자ID 일치해야됨
    // 작성자 ID가 아닌 작성자 이름을 반환하기 위해 스키마에 정의한 릴레이션 활용해서 조회
    const resume = await prisma.resume.findUnique({
      where: {
        user_id: userId,
        id: +id
      },
      select: {
        id: true,
        user_id: true,
        title: true,
        about_me: true,
        status: true,
        created_at: true,
        updated_at: true,
        user:{
          select: {
            name: true
          }
        }
      }
    });
    // 3-3 이력서가 없는 경우
    if(!resume) {
      return res.status(404).json({message:'이력서가 존재하지 않습니다.'});
    }
    // 3-4 이력서id, 작성자 이름, 제목, 자기소개, 지원상태, 생성일시, 수정일시 반환
    const result = {
      id : resume.id,
      name: resume.user.name,
      title: resume.title,
      about_me: resume.about_me,
      status: resume.status,
      created_at: resume.created_at,
      updated_at: resume.updated_at
    };
    return res.status(200).json({data: result});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 4. 이력서 수정 API
router.patch('/resumes/:id', accessTokenMiddle, async(req, res, next) => {
  try {
    const userId = req.user.id;
    const {id} = req.params;
    const{title, about_me} = req.body;

    // 4-1 제목, 자기소개 둘 다 없는 경우
    if(!title && !about_me) {
      return res.status(404).json({message:'수정 할 정보를 입력해 주세요.'});
    }
    // 4-2 이력서 정보가 없는 경우
    if(!id) {
      return res.status(404).json({message:'이력서가 존재하지 않습니다.'});
    }
    // 4-3 현재 로그인 한 사용자가 작성한 이력서만 수정한다
    // DB에서 이력서 조회 시 이력서 ID, 작성자 ID가 모두 일치해야 한다
    const resume = await prisma.resume.findFirst({
      where: {
        user_id: userId,
        id: +id
      },
      select: {
        id: true,
        user_id: true,
        title: true,
        about_me: true,
        status: true,
        created_at: true,
        updated_at: true,
        user: {
          select: {
            name: true
          }
        }
      }
    });
    // 4-4 이력서 정보가 없는 경우
    if(!resume) {
      return res.status(404).json({message:'이력서가 존재하지 않습니다.'});
    }
    // 4-5 DB에서 이력서 정보를 수정한다
    // 제목, 자기소개는 개별 수정이 가능하다
    const resumeLogs = await prisma.resume.update({
      where: {id: +id},
      data: {
        ...(title && {title}),
        ...(about_me && {about_me}),
      },
      select: {
        id: true,
        user_id: true,
        title: true,
        about_me: true,
        status: true,
        created_at: true,
        updated_at: true,
        user: {
          select :{
            name: true
          }
        }
      }
    });
    
    // 4-6 수정 된 이력서id, 작성자 id, 제목, 자기소개, 지원상태, 생성일시, 수정일시 반환
    const result = {
      id : resumeLogs.id,
      user_id: resumeLogs.user_id,
      name: resumeLogs.user.name,
      title: resumeLogs.title,
      about_me: resumeLogs.about_me,
      status: resumeLogs.status,
      created_at: resumeLogs.created_at,
      updated_at: resumeLogs.updated_at
    };
    return res.status(200).json({data: result});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 5 이력서 삭제
router.delete('/resumes/:id', accessTokenMiddle, async (req, res, next) => {
  try {
    const{id} =req.params;
    const userId = req.user.id;

    // 이력서 정보가 없는 경우
    if(!id) {
      return res.status(400).json({message:'이력서가 존재하지 않습니다.'});
    }
    // DB에서 이력서 조회시 이력서 ID, 작성자 ID가 모두 일치해야 한다.
    const resume = await prisma.resume.findFirst({
      where: {
        user_id: userId,
        id: +id
      },
    });
    if (!resume) {
      return res.status(404).json({message:'이력서를 찾을 수 없습니다.'});
    }
    // DB에서 이력서 정보를 삭제합니다.
    const deleteResume = await prisma.resume.delete({
      where: {id : +id},
    });
    // 삭제 된 이력서 ID 반환
    const result = {
      id: deleteResume.id,
    };
    return res.status(200).json({data:result});
  } catch(error){
    console.error(error);
    next(error);
  }
});

// // 6 이력서 지원 상태 변경
// router.patch('/resumes/:id/status', accessTokenMiddle, async (req, res, next)=> {
//   try {
//     const data = null;
//     return res.status(200).json({
      
//       message: "이력서 상태 변경에 성공하였습니다.",
//       data,
//     });
//   } catch (error){
//     next(error);
//   }
// });



export default router;