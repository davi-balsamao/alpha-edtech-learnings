// src/routes/loginRoutes.js
import express from 'express';
import * as loginController from '../controllers/loginController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// --- ROTA PÚBLICA (Qualquer um entra) ---
router.post('/', loginController.login); // Fazer Login

// --- ROTAS PROTEGIDAS (Precisa estar logado) ---
// O authMiddleware roda antes de tudo aqui
router.use(authMiddleware);

// 1. GET /api/login/ -> Dados do próprio usuário
router.get('/', loginController.getMyProfile);

// 2. GET /api/login/all -> Listar todos (Só Admin)
router.get('/all', loginController.getAllUsers);

// 3. GET /api/login/:username -> Buscar um (Só Admin)
router.get('/:username', loginController.getUserByUsername);

// 4. PUT /api/login/:username -> Atualizar (Só Admin)
router.put('/:username', loginController.updateUser);

// 5. DELETE /api/login/:username -> Deletar (Só Admin)
router.delete('/:username', loginController.deleteUser);

export default router;