import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';
import hashPassword from '../utils/hashPassword.js';       // Import novo
import comparePassword from '../utils/comparePassword.js'; // Import novo

// --- 1. BANCO DE DADOS VOLÁTIL ---
// Iniciamos vazio e populamos com função async para ter os hashes
const usuarios = [];

// Função para criar os usuários iniciais com senha criptografada
async function inicializarUsuarios() {
    const senhaAdmin = await hashPassword("123");
    const senhaDavi = await hashPassword("abc");

    usuarios.push({ 
        id: 1, 
        username: "admin", 
        password: senhaAdmin, // Agora é um hash gigante!
        name: "Administrador",
        role: "admin"
    });

    usuarios.push({ 
        id: 2, 
        username: "davi", 
        password: senhaDavi, 
        name: "Davi Ladeira",
        role: "user"
    });
    
    console.log("Usuários iniciais carregados com senhas criptografadas.");
}

// Rodamos isso assim que o arquivo é lido
inicializarUsuarios();


// --- 2. LÓGICA DE LOGIN ---
export const login = async (req, res) => { // Note o async aqui!
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ erro: "Usuário e senha obrigatórios." });
    }

    // A. Buscar usuário pelo nome (NÃO verificamos senha aqui ainda)
    const usuarioEncontrado = usuarios.find(u => u.username === username);

    if (!usuarioEncontrado) {
        // Por segurança, mensagem genérica para não revelar que o usuário existe
        return res.status(401).json({ erro: "Credenciais inválidas." });
    }

    // B. Verificar a senha usando o bcrypt (Comparar senha digitada com o Hash)
    const senhaBate = await comparePassword(password, usuarioEncontrado.password);

    if (!senhaBate) {
        return res.status(401).json({ erro: "Credenciais inválidas." });
    }

    // C. Gerar Token (Igual antes)
    const dadosDoToken = {
        username: usuarioEncontrado.username,
        role: usuarioEncontrado.role,
        name: usuarioEncontrado.name
    };

    const tokenJWT = jwt.sign(dadosDoToken, SECRET_KEY, { expiresIn: '1h' });

    res.cookie('session_id', tokenJWT, { 
        maxAge: 3600000, 
        httpOnly: true 
    });

    res.status(200).json({ mensagem: "Login realizado com sucesso!" });
};

// --- 3. FUNCIONALIDADES (Adaptadas para ler do JWT) ---

export const getMyProfile = (req, res) => {
    // Agora req.user vem direto do token JWT decodificado
    res.json(req.user);
};

export const getAllUsers = (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ erro: "Acesso Negado" });
    // Removemos senhas para exibição
    const listaSegura = usuarios.map(({ password, ...resto }) => resto);
    res.json(listaSegura);
};

export const getUserByUsername = (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ erro: "Acesso Negado" });
    const usuario = usuarios.find(u => u.username === req.params.username);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(usuario);
};

export const updateUser = (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ erro: "Acesso Negado" });
    
    const index = usuarios.findIndex(u => u.username === req.params.username);
    if (index === -1) return res.status(404).json({ erro: "Usuário não encontrado" });

    usuarios[index] = {
        ...usuarios[index],
        name: req.body.name || usuarios[index].name,
        role: req.body.role || usuarios[index].role,
        password: req.body.password || usuarios[index].password
    };
    res.json({ mensagem: "Usuário atualizado", usuario: usuarios[index] });
};

export const deleteUser = (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ erro: "Acesso Negado" });
    
    const index = usuarios.findIndex(u => u.username === req.params.username);
    if (index === -1) return res.status(404).json({ erro: "Usuário não encontrado" });

    usuarios.splice(index, 1);
    res.json({ mensagem: "Usuário removido." });
};

export const logout = (req, res) => {
    res.clearCookie('session_id');
    res.json({ mensagem: "Logout realizado." });
};