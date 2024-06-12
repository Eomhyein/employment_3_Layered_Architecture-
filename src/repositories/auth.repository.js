// src/repositories/auth.repository.js
import { prisma } from '../utils/prisma.util.js';

const AuthRepository = {
  findById: async (userId) => {
    return await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
  },
};

export default AuthRepository;