import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';
import hashPassword from '../utils/hashPassword.js';
import comparePassword from '../utils/comparePassword.js';
import db from '../database/index.js'; // <--- Importamos o Banco Real

// --- 1. INICIALIZAÇÃO DO BANCO ---
async function inicializarUsuarios() {
    try {
        // Tenta buscar o admin. Se achar, não faz nada.
        await db.get('user:admin');
        console.log("Banco de dados já possui usuários.");
    } catch (error) {
        // Se der erro 'NOT_FOUND', significa que o banco está vazio. Vamos criar!
        if (error.code === 'LEVEL_NOT_FOUND') {
            const senhaAdmin = await hashPassword("123");
            const senhaDavi = await hashPassword("abc");

            const adminUser = { 
                username: "admin", 
                password: senhaAdmin, 
                name: "Administrador",
                role: "admin"
            };

            const daviUser = { 
                username: "davi", 
                password: senhaDavi, 
                name: "Davi Ladeira",
                role: "user"
            };

            // Salvamos no LevelDB usando 'user:username' como chave
            await db.put('user:admin', adminUser);
            await db.put('user:davi', daviUser);
            
            console.log("Usuários iniciais criados no LevelDB.");
        }
    }
}

// Roda a verificação ao iniciar
inicializarUsuarios();


// --- 2. LÓGICA DE LOGIN (Agora buscando do Banco) ---
export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ erro: "Usuário e senha obrigatórios." });
    }

    try {
        // A. Busca direto no banco pela chave 'user:nome'
        const usuarioEncontrado = await db.get(`user:${username}`);

        // B. Verifica senha
        const senhaBate = await comparePassword(password, usuarioEncontrado.password);
        if (!senhaBate) {
            throw new Error('Senha incorreta'); // Força ida pro catch
        }

        // C. Gera Token
        const dadosDoToken = {
            username: usuarioEncontrado.username,
            role: usuarioEncontrado.role,
            name: usuarioEncontrado.name
        };

        const tokenJWT = jwt.sign(dadosDoToken, SECRET_KEY, { expiresIn: '1h' });

        res.cookie('session_id', tokenJWT, { maxAge: 3600000, httpOnly: true });
        res.status(200).json({ mensagem: "Login realizado com sucesso!" });

    } catch (error) {
        // Se o erro for 'LEVEL_NOT_FOUND' ou senha errada
        return res.status(401).json({ erro: "Credenciais inválidas." });
    }
};

// --- 3. DEMAIS FUNÇÕES (Adaptadas para o Banco) ---

export const getMyProfile = (req, res) => {
    res.json(req.user);
};

export const getAllUsers = async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ erro: "Acesso Negado" });
    
    // LevelDB: Iterar para pegar todos
    const usuarios = [];
    for await (const [key, value] of db.iterator()) {
        if (key.startsWith('user:')) { // Só pega chaves de usuário
            const { password, ...dadosSeguros } = value; // Remove senha
            usuarios.push(dadosSeguros);
        }
    }
    res.json(usuarios);
};

export const getUserByUsername = async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ erro: "Acesso Negado" });
    
    try {
        const usuario = await db.get(`user:${req.params.username}`);
        const { password, ...dadosSeguros } = usuario;
        res.json(dadosSeguros);
    } catch (error) {
        res.status(404).json({ erro: "Usuário não encontrado" });
    }
};

export const updateUser = async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ erro: "Acesso Negado" });
    
    try {
        const key = `user:${req.params.username}`;
        const usuarioAntigo = await db.get(key);

        const usuarioNovo = {
            ...usuarioAntigo,
            name: req.body.name || usuarioAntigo.name,
            role: req.body.role || usuarioAntigo.role,
            password: req.body.password ? await hashPassword(req.body.password) : usuarioAntigo.password
        };

        await db.put(key, usuarioNovo);
        res.json({ mensagem: "Usuário atualizado", usuario: usuarioNovo });
    } catch (error) {
        res.status(404).json({ erro: "Usuário não encontrado" });
    }
};

export const deleteUser = async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ erro: "Acesso Negado" });
    
    try {
        await db.del(`user:${req.params.username}`);
        res.json({ mensagem: "Usuário removido." });
    } catch (error) {
        res.status(404).json({ erro: "Erro ao remover usuário" });
    }
};

export const logout = (req, res) => {
    res.clearCookie('session_id');
    res.json({ mensagem: "Logout realizado." });
};