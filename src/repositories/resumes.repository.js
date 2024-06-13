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
  // 2. 이력서 목록 조회 API 내가 등록한 이력서 목록 조회
  findAllByUserId = async (userId, sortOrder) => {
    // 2-2 생성일시 기준 정렬 과거순(ASC), 최신순(DESC)으로 전달 받는다 sort
      // 값이 없는 경우 최신순(DESC), 대소문자 구분 없이 동작
    const SortOrder = sortOrder.toUpperCase() === 'ASC' ? 'asc' : 'desc';
    // 2-3 현재 로그인 한 사용자가 작성한 이력서 목록만 조회
      // DB에서 이력서 조회시 작성자 ID 일치하는지 확인
      // 정렬 조건에 따라 다른 결과 값 조회
      // 작성자 ID가 아닌 작성자 이름을 반환하기 위해 스키마에 정의 한 Relation을 활용해 조회
    return await this.prisma.resume.findMany({
      where: { user_id: userId },
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
      },
      orderBy: {
        created_at: SortOrder
      }
    });
  }
  // 3. 이력서 상세 조회 API
  findDetailUserId = async (userId, id) => {
    // 3-2
    // 현재 로그인 한 사용자가 작성한 이력서만 조회
    // DB에서 이력서 조회시 이력서 ID, 작성자ID 일치해야됨
    // 작성자 ID가 아닌 작성자 이름을 반환하기 위해 스키마에 정의한 릴레이션 활용해서 조회
    return await this.prisma.resume.findUnique({
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
  };
  // 4. 이력서 수정
  loginUserResume = async (userId, id, title, about_me) => {
    // 4-3 현재 로그인 한 사용자가 작성한 이력서만 수정한다
    // DB에서 이력서 조회 시 이력서 ID, 작성자 ID가 모두 일치해야 한다
    const resume = await this.prisma.resume.findFirst({
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
    
    // 4-5 DB에서 이력서 정보를 수정한다
    // 제목, 자기소개는 개별 수정이 가능하다
    return await this.prisma.resume.update({
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
  }
  // 5. 이력서 삭제
};