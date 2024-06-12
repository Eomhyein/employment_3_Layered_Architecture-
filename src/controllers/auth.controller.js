// src/controllers/auth.controller.js
import { AuthService } from '../services/auth.service.js';

export default class AuthController {
  authService = new AuthService();
  // 3. 내 정보 조회 API
  getMe = async(req, res, next) => {
    try {
      const user = await this.authService.getMe(req.user.id)
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
};

