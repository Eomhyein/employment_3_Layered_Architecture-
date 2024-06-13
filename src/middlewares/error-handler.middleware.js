// src/middlewares/error-handler.middleware.js
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // joi에서 발생한 에러 처리
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
  // 그 밖의 예상치 못한 에러 처리
  return res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: err.message,
  });
};
