// src/controllers/loginController.js
import crypto from 'crypto';

// --- 1. BANCO DE DADOS (Com Cargos/Roles) ---
// Adicionamos a propriedade 'role' conforme a Questão 2 pede.
const usuarios = [
    { 
        id: 1, 
        username: "admin", 
        password: "123", 
        name: "Administrador",
        role: "admin", // <--- PERMISSÃO TOTAL
        sessionToken: null 
    },
    { 
        id: 2, 
        username: "davi", 
        password: "abc",
        name: "Davi Ladeira",
        role: "user",  // <--- PERMISSÃO RESTRITA
        sessionToken: null 
    }
];

// --- 2. LÓGICA DE LOGIN (PÚBLICA) ---
// POST /api/login
export const login = (req, res) => {
    const { username, password } = req.body;

    // Busca usuário que tenha ESSE user E ESSA senha
    const usuarioEncontrado = usuarios.find(
        u => u.username === username && u.password === password
    );

    if (!usuarioEncontrado) {
        return res.status(401).json({ erro: "Credenciais inválidas." });
    }

    // Gera o token (crachá)
    const novoToken = crypto.randomUUID(); 
    usuarioEncontrado.sessionToken = novoToken;

    // Salva no Cookie (para o navegador lembrar)
    res.cookie('session_id', novoToken, { maxAge: 900000, httpOnly: true });

    res.status(200).json({ mensagem: "Login realizado!" });
};

// --- 3. FUNCIONALIDADES DO USUÁRIO ---

// GET /api/login/ (Quem sou eu?)
export const getMyProfile = (req, res) => {
    // O 'req.user' foi colocado aqui pelo Middleware (o porteiro)
    // Então não precisamos buscar no banco de novo.
    const { password, sessionToken, ...dadosSeguros } = req.user;
    res.json(dadosSeguros);
};

// --- 4. FUNCIONALIDADES DO ADMIN (RESTRITAS) ---

// GET /api/login/all (Ver todos)
export const getAllUsers = (req, res) => {
    // VERIFICAÇÃO DE SEGURANÇA: Só admin passa
    if (req.user.role !== 'admin') {
        return res.status(403).json({ erro: "Acesso Negado: Apenas Admins." });
    }

    // Removemos as senhas antes de enviar a lista (boa prática)
    const listaSegura = usuarios.map(({ password, sessionToken, ...resto }) => resto);
    res.json(listaSegura);
};

// GET /api/login/:username (Buscar um específico)
export const getUserByUsername = (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ erro: "Acesso Negado" });

    const targetUser = req.params.username;
    const usuario = usuarios.find(u => u.username === targetUser);

    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

    // Retorna os dados (sem a senha, idealmente, mas para o exercicio pode ir direto)
    res.json(usuario);
};

// PUT /api/login/:username (Atualizar Usuário)
export const updateUser = (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ erro: "Acesso Negado" });

    const targetUser = req.params.username;
    const index = usuarios.findIndex(u => u.username === targetUser);

    if (index === -1) return res.status(404).json({ erro: "Usuário não encontrado" });

    // ATUALIZAÇÃO SEGURA (Mantém ID e Token, atualiza o resto)
    usuarios[index] = {
        ...usuarios[index], // Copia dados antigos
        name: req.body.name || usuarios[index].name,
        role: req.body.role || usuarios[index].role,
        password: req.body.password || usuarios[index].password
    };

    res.json({ mensagem: "Usuário atualizado", usuario: usuarios[index] });
};

// DELETE /api/login/:username (Deletar Usuário)
export const deleteUser = (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ erro: "Acesso Negado" });

    const targetUser = req.params.username;
    const index = usuarios.findIndex(u => u.username === targetUser);

    if (index === -1) return res.status(404).json({ erro: "Usuário não encontrado" });

    // Remove do array
    usuarios.splice(index, 1);
    res.json({ mensagem: "Usuário removido com sucesso." });
};

// Precisamos exportar 'usuarios' para o Middleware consultar
export { usuarios };