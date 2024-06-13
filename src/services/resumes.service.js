// src/services/resumes.service.js
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken'; 
// import { authConstants } from '../constants/auth.constant.js'; // 토큰 연결

export default class ResumesService {
  constructor(resumeRepository) {
    this.resumeRepository = resumeRepository
  }
  // 1. 이력서 생성 API
  createdResume = async (title, about_me, userId) => {
    // 1-1 제목, 자기소개 중 하나라도 빠진 경우
    if (!title) {
      throw new Error('제목을 입력해 주세요.');
    }
    if (!about_me) {
      throw new Error('자기소개를 입력해 주세요.');
    }
    // 1-2 자기소개 글자 수가 150자 보다 짧은 경우
    if (about_me.length < 150) {
      throw new Error('자기소개는 150자 이상 작성해야 합니다.');
    }
    // 1-3 사용자 id는 미들웨어를 통해 req.user.id에 설정됨
    if (!userId) {
      throw new Error('인증된 사용자가 아닙니다.');
    }
    // 1-4 새로운 이력서 생성
    const newResume = await this.resumeRepository.create(title, about_me, userId);
    // 1-5. 생성된 이력서 반환
    return newResume;
  };

  // 2. 이력서 목록 조회 API 내가 등록한 이력서 목록 조회
  getAllResume = async (userId, sortOrder) => {
    const resumes = await this.resumeRepository.findAllByUserId(userId, sortOrder);
  
    // 2-4 일치하는 값이 없는 경우 빈 배열을 반환(StatusCode: 200)
    if (!resumes || resumes.length === 0) {
      return [];
    }
    // 2-5 이력서id, 작성자 이름, 제목, 자기소개, 지원상태, 생성일시, 수정일시 반환
    return resumes.map(resume => ({
      id: resume.id,
      name: resume.user.name,
      title: resume.title,
      about_me: resume.about_me,
      status: resume.status,
      created_at: resume.created_at,
      updated_at: resume.updated_at
    }));
  };

  // 3. 이력서 상세 조회 API
  getDetailResume = async (userId, resumeId) => {
    const resume = await this.resumeRepository.findDetailUserId(userId, resumeId);
    let result 
    if(resume) {
      // 3-4 이력서id, 작성자 이름, 제목, 자기소개, 지원상태, 생성일시, 수정일시 반환
    result = {
      id : resume.id,
      name: resume.user.name,
      title: resume.title,
      about_me: resume.about_me,
      status: resume.status,
      created_at: resume.created_at,
      updated_at: resume.updated_at
    };
    }
    return result;
  }


  // 4. 이력서 수정 API
  updateResume = async (userId, resumeId, title, about_me) => {
    const updatedResume = await this.resumeRepository.loginUserResume(userId, resumeId, title, about_me);
    return {
      id: updatedResume.id,
      user_id: updatedResume.user_id,
      name: updatedResume.user.name,
      title: updatedResume.title,
      about_me: updatedResume.about_me,
      status: updatedResume.status,
      created_at: updatedResume.created_at,
      updated_at: updatedResume.updated_at
    };
  };
  // 5. 이력서 삭제



  
}
