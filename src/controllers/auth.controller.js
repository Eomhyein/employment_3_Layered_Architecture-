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

  // 2. 로그인 API
  Login = async(req, res, next) => {
    try {
      const { email, password } = req.body;
      const userLogin = await this.authService.Login(email, password);
        return res.status(200).json(userLogin);
      } catch (error) {
        next(error); // 에러가 발생하면 에러 핸들러로 전달합니다.
    }
  }
};