// src/controllers/users.controller.js
export default class UsersController {
  constructor(authService) {
    this.authService = authService
  }

  // 3. 내 정보 조회 API
  getMe = async(req, res, next) => {
    try {
      const user = await this.authService.getMe(req.user.id)
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
};