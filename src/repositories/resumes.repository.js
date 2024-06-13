// src/repositories/resumes.repository.js
export class ResumeRepository {
  constructor(prisma) {
    this.prisma = prisma
  }
  // 1. 이력서 생성 API
  create = async (title, about_me, userId) => {
    return await this.prisma.resume.create({
      data: {
        user_id: userId,
        title,
        about_me,
        status: 'APPLY', // 기본 상태 설정
      },
    });
  }

};