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
  return res.status(500).json({
    status: 500,
    message: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.',
  });
};

// 회원가입에 대한 에러처리
// 유효성 검증 및 에러 처리
// 회원 정보 중 하나라도 빠진 경우 - “OOO을 입력해 주세요.”
// 이메일 형식에 맞지 않는 경우 - “이메일 형식이 올바르지 않습니다.”
// 이메일이 중복되는 경우 - “이미 가입 된 사용자입니다.”
// 비밀번호가 6자리 미만인 경우 - “비밀번호는 6자리 이상이어야 합니다.”
// 비밀번호와 비밀번호 확인이 일치하지 않는 경우 - “입력 한 두 비밀번호가 일치하지 않습니다.”