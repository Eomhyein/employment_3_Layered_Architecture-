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
      return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };
  // 2. 이력서 조회
  // 3. 이력서 상세조회
  // 4. 이력서 수정
  // 5. 이력서 삭제 

}