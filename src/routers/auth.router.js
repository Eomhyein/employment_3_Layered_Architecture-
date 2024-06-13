// src/routers/auth.router.js
import express from 'express';
import { prisma } from '../utils/prisma.util.js'; // connectDb 연결
import AuthController from '../controllers/auth.controller.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { AuthService } from '../services/auth.service.js';

const router = express.Router();
const usersRepository = new UsersRepository(prisma);
const authService = new AuthService(usersRepository);
const authController = new AuthController(authService);

// 1. 사용자 회원가입 API
// POST: /auth/sign-up
router.post('/auth/sign-up', authController.signUp);

// 2. 로그인 API
// POST: /auth/login
router.post('/auth/login', authController.Login); 

export default router;