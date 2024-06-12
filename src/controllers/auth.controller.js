// src/controllers/auth.controller.js
import AuthService from '../services/auth.service.js';

const AuthController = {
  getMe: async(req, res, next) => {
    try {
      const user = await AuthService.getMe(req.user.id)
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;