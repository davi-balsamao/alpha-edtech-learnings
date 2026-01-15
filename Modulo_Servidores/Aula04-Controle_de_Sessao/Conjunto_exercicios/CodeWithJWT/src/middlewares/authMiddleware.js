// src/middlewares/authMiddleware.js
// Importamos a lista de usuários para conferir se o token existe lá
import { usuarios } from '../controllers/loginController.js';

const authMiddleware = (req, res, next) => {
    // 1. Tenta pegar o cookie 'session_id'
    const tokenRecebido = req.cookies.session_id;

    // 2. Se não tem cookie, barra na porta
    if (!tokenRecebido) {
        return res.status(401).json({ erro: "Não autenticado. Faça login." });
    }

    // 3. Procura quem é o dono desse token
    const usuario = usuarios.find(u => u.sessionToken === tokenRecebido);

    // 4. Se o token não bate com ninguém (inválido ou expirado)
    if (!usuario) {
        return res.status(403).json({ erro: "Sessão inválida." });
    }

    // 5. SUCESSO! Pendura o usuário na requisição
    // Isso permite que o Controller saiba quem está logado (se é admin, etc)
    req.user = usuario;

    // 6. Pode passar
    next();
};

export default authMiddleware;