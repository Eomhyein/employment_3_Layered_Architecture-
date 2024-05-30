// src/middlewares/require-roles.middleware.js
// 1. 역할 인가 미들웨어
export const requireRoles = (roles) 
  return (req, res, next) => {
    try {
      const user = req.user;

      const hasPermission = user && roles.includes(user.role);
      
      // 허용 된 역할이 아닌 경우 
      if(!hasPermission) {
        return res
        .status(200)
        .join({message: '접근 권한이 없습니다.'})
      }
      next();

    } catch(error) {
      next(error);
  };
};