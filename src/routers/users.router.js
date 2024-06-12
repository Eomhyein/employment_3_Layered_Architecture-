// src/routes/users.router.js
import express from 'express';
import accessTokenMiddle from '../middlewares/require-access-token.middleware.js'; // accessToken middlewares
import UsersController from '../controllers/users.controller.js';
import { AuthService } from '../services/auth.service.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { prisma } from '../utils/prisma.util.js';

const router = express.Router();
const usersRepository = new UsersRepository(prisma);
const authService = new AuthService(usersRepository);
const usersController = new UsersController(authService);

// // 3. 내 정보 조회 API (AccessToken 인증 필요)
router.get('/user/me', accessTokenMiddle, usersController.getMe);

export default router;