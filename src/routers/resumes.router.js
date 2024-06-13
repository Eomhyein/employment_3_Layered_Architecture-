// src/routers/resumes.router.js
import express from 'express';
import { prisma } from '../utils/prisma.util.js'; // connectDb 연결
import accessTokenMiddle from '../middlewares/require-access-token.middleware.js'; // 토큰 연결
import ResumesController from '../controllers/resumes.controller.js';
import { ResumeRepository } from '../repositories/resumes.repository.js';
import ResumesService from '../services/resumes.service.js';

const router = express.Router();
const resumeRepository = new ResumeRepository(prisma);
const resumeService = new ResumesService(resumeRepository);
const resumesController = new ResumesController(resumeService);

// 1. 이력서 생성 API
router.post('/resumes', accessTokenMiddle, resumesController.createdResume);
  
// 2. 이력서 목록 조회 API 내가 등록한 이력서 목록 조회
router.get('/resumes', accessTokenMiddle, resumesController.getAllResume);
  
// 3. 이력서 상세 조회 API
router.get('/resumes/:id', accessTokenMiddle, resumesController.getDetailResume);

// 4. 이력서 수정 API
router.patch('/resumes/:id', accessTokenMiddle, resumesController.updateResume);

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