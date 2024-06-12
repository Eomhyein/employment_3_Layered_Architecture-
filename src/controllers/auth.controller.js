// src/controllers/auth.controller.js
export default class AuthController {
  constructor(authService) {
    this.authService = authService
  }
  // 1. 사용자 회원가입 API
  signUp = async(req, res, next) => {
    try {
      // 1-1. 이메일, 비밀번호, 이름을  req.body로 전달받는다.
      const { email, password, passwordConfirm, name } = req.body;
      const userJoin = await this.authService.signUp(email, password, passwordConfirm, name)
      return res.status(200).json(userJoin);
    } catch (error) {
      next(error);
    }
  }
};