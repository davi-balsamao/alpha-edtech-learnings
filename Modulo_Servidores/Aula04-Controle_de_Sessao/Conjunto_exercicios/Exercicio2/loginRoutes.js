import express from 'express';
import * as loginController from '../controllers/loginController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// --- ROTA PÚBLICA ---
router.post('/', loginController.login); // Fazer Login

// --- ROTAS PROTEGIDAS (Precisa estar logado) ---
router.use(authMiddleware);

// GET /api/login/ -> Dados do próprio usuário
router.get('/', loginController.getMyProfile);

// GET /api/login/all -> Listar todos (Só Admin)
router.get('/all', loginController.getAllUsers);

// GET /api/login/:username -> Buscar um (Só Admin)
router.get('/:username', loginController.getUserByUsername);

// PUT /api/login/:username -> Atualizar (Só Admin)
router.put('/:username', loginController.updateUser);

// DELETE /api/login/:username -> Deletar (Só Admin)
router.delete('/:username', loginController.deleteUser);

export default router;