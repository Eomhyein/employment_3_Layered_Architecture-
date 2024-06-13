// src/services/auth.service.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import { authConstants } from '../constants/auth.constant.js'; // 토큰 연결

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

  // 2. 로그인 API
  Login = async (email, password) => {
    // 2.1 로그인 정보 중 하나라도 빠진 경우 처리
    if (!email) {
      throw new Error('이메일을 입력해 주세요.');
    }
    if (!password) {
      throw new Error('비밀번호을 입력해 주세요.');
    }
    // 2.2 이메일 형식에 맞지 않는 경우
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('이메일 형식이 올바르지 않습니다.');
    }
    // 2.3 이메일로 조회가 불가하거나 비밀번호가 다를 경우
    const user = await this.usersRepository.findByEmail(email);

    // 2-4 입력받은 사용자의 비밀번호와 데이터베이스에 저장된 비밀번호를 비교합니다.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('인증 정보가 유효하지 않습니다.');
    }
    const secretKey = process.env.SECRET_KEY;
    // 2-5 로그인에 성공하면, 사용자의 id를 바탕으로 토큰을 생성합니다.
    const token = jwt.sign(
      {
        id: user.id,
      },
      authConstants.secretKey,
      {expiresIn:'12h'} // 2-5 토큰 만료 시간을 12시간으로 설정
    );
    return { accessToken: token, message: '로그인 성공' };
  }

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