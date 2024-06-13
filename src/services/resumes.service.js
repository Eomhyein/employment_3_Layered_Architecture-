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

}


