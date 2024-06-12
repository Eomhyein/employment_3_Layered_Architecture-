// src/services/auth.service.js
import bcrypt from 'bcrypt';
export class AuthService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }
  // 1. 사용자 회원가입 API
  signUp = async (email, password, passwordConfirm, name) => {
    if (!email) {
      throw new Error('이메일을 입력해주세요');
    }
    if (!password) {
      throw new Error('비밀번호를 입력해주세요');
    }
    if (!passwordConfirm) {
      throw new Error('비밀번호 확인을 입력해주세요');
    }
    if (!name) {
      throw new Error('이름을 입력해주세요');
    }
    // 1-2. 이메일 형식에 맞지 않는 경우 - “이메일 형식이 올바르지 않습니다.”
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 정규표현식으로 이메일형태(아이디.@주소.com)를 생각하면됨
    if (!emailRegex.test(email)) {
      throw new Error('이메일 형식이 올바르지 않습니다.');
    }
    // 1-3. 동일한 이메일을 가진 사용자가 있는지 확인합니다.
    const isExistUser = await this.usersRepository.findByEmail(email);
    if (isExistUser) {
      throw new Error('이미 가입 된 사용자입니다.');
    }

    // 1-4 비밀번호가 6자리 미만인 경우 - “비밀번호는 6자리 이상이어야 합니다.”
    if (password.length < 6) {
      throw new Error('비밀번호는 6자리 이상이어야 합니다.');
    }

    // 1-5 비밀번호와 비밀번호 확인이 일치하지 않는 경우 - “입력 한 두 비밀번호가 일치하지 않습니다.”
    if (password !== passwordConfirm) {
      throw new Error('입력 한 두 비밀번호가 일치하지 않습니다.');
    }

    // 1-8 사용자 비밀번호를 암호화합니다
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.usersRepository.createUser(email, hashedPassword, name);
    // 1-7 사용자 정보 반환(id, email, name, role, created_at, update_at)
    return {
      message: '회원가입이 완료되었습니다.',
      user: {
        id: createdUser.id,
        email,
        name,
        role: createdUser.role,
        created_at: createdUser.created_at,
        updated_at: createdUser.updated_at,
      },
    }
  };

  


  // 3. 내 정보 조회 API
  getMe = async (userId) => {
    const user = await this.usersRepository.findByUserId(userId);
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