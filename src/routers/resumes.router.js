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
router.delete('/resumes/:id', accessTokenMiddle, resumesController.deleteResume);

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