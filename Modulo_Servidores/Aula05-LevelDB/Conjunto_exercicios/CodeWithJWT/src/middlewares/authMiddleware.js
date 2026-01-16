import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js'; // Importamos a chave para conferir a assinatura

const authMiddleware = (req, res, next) => {
    const tokenRecebido = req.cookies.session_id;

    if (!tokenRecebido) {
        return res.status(401).json({ erro: "Não autenticado (Token ausente)." });
    }

    try {
        // A função verify tenta abrir o token usando a nossa SECRET_KEY.
        // Se o token foi alterado ou a chave estiver errada, ela lança um erro (cai no catch).
        const dadosDecodificados = jwt.verify(tokenRecebido, SECRET_KEY);

        // O verify devolve os dados que colocamos lá no login (username, role, etc)
        // Guardamos isso no req.user para os controllers usarem
        req.user = dadosDecodificados;

        next();

    } catch (error) {
        // Se o token for falso, expirado ou inválido
        return res.status(403).json({ erro: "Token JWT Inválido ou Expirado." });
    }
};

export default authMiddleware;