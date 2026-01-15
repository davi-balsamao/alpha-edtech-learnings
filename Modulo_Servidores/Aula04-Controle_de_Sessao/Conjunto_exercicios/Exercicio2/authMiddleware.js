import { usuarios } from '../controllers/loginController.js';

const authMiddleware = (req, res, next) => {
    const tokenRecebido = req.cookies.session_id;

    // Validação
    if (!tokenRecebido) {
        return res.status(401).json({ erro: "Não autenticado. Faça login." });
    }

    // Procura quem é o dono desse token
    const usuario = usuarios.find(u => u.sessionToken === tokenRecebido);

    // Validação Token
    if (!usuario) {
        return res.status(403).json({ erro: "Sessão inválida." });
    }

    req.user = usuario;

    next();
};

export default authMiddleware;