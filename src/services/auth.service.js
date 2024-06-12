// src/services/auth.service.js
import { AuthRepository } from '../repositories/auth.repository.js';

export class AuthService {
  authRepository = new AuthRepository();
  // 3. 내 정보 조회 API
  getMe = async (userId) => {
    const user = await this.authRepository.findById(userId);
    if(!user) {
      throw new Error('사용자를 찾지 못했습니다.');
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
  }
};