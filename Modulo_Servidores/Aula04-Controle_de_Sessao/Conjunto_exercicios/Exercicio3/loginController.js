import jwt from 'jsonwebtoken'; 
import { SECRET_KEY } from '../config.js'; 

// --- BANCO DE DADOS (Mesma estrutura) ---
const usuarios = [
    { 
        id: 1, 
        username: "admin", 
        password: "123", 
        name: "Administrador",
        role: "admin", 
    },
    { 
        id: 2, 
        username: "davi", 
        password: "abc",
        name: "Davi Ladeira",
        role: "user", 
    }
];

// --- LÓGICA DE LOGIN  ---
export const login = (req, res) => {
    const { username, password } = req.body;

    const usuarioEncontrado = usuarios.find(
        u => u.username === username && u.password === password
    );

    if (!usuarioEncontrado) {
        return res.status(401).json({ erro: "Credenciais inválidas." });
    }

    // Criamos o PAYLOAD (os dados que vão dentro do token)
    const dadosDoToken = {
        username: usuarioEncontrado.username,
        role: usuarioEncontrado.role,
        name: usuarioEncontrado.name
    };

    // Assinamos o token (jwt.sign)
    // 1º param: dados, 2º param: chave secreta, 3º param: validade (1 hora)
    const tokenJWT = jwt.sign(dadosDoToken, SECRET_KEY, { expiresIn: '1h' });

    // Enviamos o JWT como cookie 
    res.cookie('session_id', tokenJWT, { 
        maxAge: 3600000, // 1 hora
        httpOnly: true 
    })

    res.status(200).json({ mensagem: "Login JWT realizado com sucesso!" });
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