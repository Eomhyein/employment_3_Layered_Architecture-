// src/constants/auth.constant.js
import dotenv from 'dotenv';

dotenv.config();

export const authConstants = {
  secretKey: process.env.SECRET_KEY, // 실제로는 환경 변수로 관리하는 것이 좋습니다.
};