import express from 'express';
import * as loginController from '../controllers/loginController.js';

const router = express.Router();

// Quando enviarem POST para /login, chama a função login
router.post('/', loginController.login);
router.post('/logout', loginController.logout);

export default router;