// src/repositories/users.repository.js
export class UsersRepository {
  // 3. 내 정보 조회 API
  constructor(prisma) {
    this.prisma = prisma
  }
  findByUserId = async (userId) => {
    return await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
  }
   // 1-3. 동일한 이메일을 가진 사용자가 있는지 확인합니다.
  findByEmail = async (email) => {
    return await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });
  }
  // 1-6 Users 테이블에 이메일, 비밀번호, 이름을 이용해 사용자를 생성한다.
  createUser = async (email, hashedPassword, name) => {
    return await this.prisma.users.create({
      data: {
        email,
        password: hashedPassword, // 1-8 암호화된 비밀번호를 저장한다
        name,
      },
    });
  }
};