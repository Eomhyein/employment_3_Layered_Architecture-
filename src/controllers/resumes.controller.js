// src/controllers/resumes.controller.js
import resumesService from '../services/resumes.service.js';

export default class ResumesController {
  constructor(resumesService) {
    this.resumesService = resumesService
  }
  // 1. 이력서 생성 API
  createdResume = async(req, res, next) => {
    try {
      // 1-1. 제목, 자기소개를 req.body로 전달받는다.
      const { title, about_me } = req.body;
      const userId = req.user.id;

      const newResume = await this.resumesService.createdResume(title, about_me, userId);

      // 1-5 이력서 id, 작성자 id, 제목, 자기소개, 지원 상태, 생성일시, 수정일시를 반환합니다.
      return res.status(201).json({
        data: {
          id: newResume.id,
          user_id: newResume.user_id,
          title: newResume.title,
          about_me: newResume.about_me,
          status: newResume.status,
          created_at: newResume.created_at,
          updated_at: newResume.updated_at,
        },
        message: '새로운 이력서가 생성되었습니다.',
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  // 2. 이력서 목록 조회 API 내가 등록한 이력서 목록 조회
  getAllResume = async(req, res, next) => {
    try {
      const userId = req.user.id;
      const { sort = 'DESC' } = req.query; // 2-1 Query Parameters 정렬 조건 받기 기본값 'DESC'
      const resumes = await this.resumesService.getAllResume(userId, sort);
      return res.status(200).json({ data: resumes });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  // 3. 이력서 상세조회
  getDetailResume = async(req, res, next) => {
    try {
      const userId = req.user.id;
      const {id} = req.params;
      console.log(id);
      const resume = await this.resumesService.getDetailResume(userId, id);
      // 3-3 이력서가 없는 경우
      if(!resume) {
        return res.status(200).json({message:'이력서가 존재하지 않습니다.'});
      }
      return res.status(200).json({ data: resume });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  
  // 4. 이력서 수정
  updateResume = async(req, res, next) => {
    try {
      const userId = req.user.id;
      const {id} = req.params;
      const{title, about_me} = req.body;

      // 4-1 제목, 자기소개 둘 다 없는 경우
      if(!title && !about_me) {
        return res.status(404).json({message:'수정 할 정보를 입력해 주세요.'});
      }
    
      const updatedResume = await this.resumesService.updateResume(userId, id, title, about_me);
      return res.status(200).json({data: updatedResume});
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  // 5. 이력서 삭제
  deleteResume = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      if (!id) {
        return res.status(400).json({ message: '이력서가 존재하지 않습니다.' });
      }

      const result = await this.resumesService.deleteResume(userId, id);
      return res.status(200).json({ data: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}