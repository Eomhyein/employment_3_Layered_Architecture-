// src/repositories/auth.repository.js
import { prisma } from '../utils/prisma.util.js';

export class AuthRepository {
  // 3. 내 정보 조회 API
  findById = async (userId) => {
    return await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
  }
};
