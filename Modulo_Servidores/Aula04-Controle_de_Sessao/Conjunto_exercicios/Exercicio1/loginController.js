import crypto from 'crypto'; 

const usuarios = [
    { 
        id: 1, 
        username: "admin", 
        password: "123", 
        name: "Administrador",
        sessionToken: null // Começa sem sessão (deslogado)
    },
    { 
        id: 2, 
        username: "davi", 
        password: "abc",
        name: "Davi Ladeira",
        sessionToken: null 
    }
];

// POST /api/login
export const login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ erro: "Usuário e senha obrigatórios." });
    }

    const usuarioEncontrado = usuarios.find(
        u => u.username === username && u.password === password
    );

    if (!usuarioEncontrado) {
        return res.status(401).json({ erro: "Credenciais inválidas." });
    }

    // Gera uma string tipo: "550e8400-e29b-41d4-a716-446655440000"
    const novoToken = crypto.randomUUID(); 

    // Salvar o token no "Banco de Dados" 
    usuarioEncontrado.sessionToken = novoToken;

    // httpOnly: true -> O JavaScript do front-end não consegue ler (Segurança)
    res.cookie('session_id', novoToken, { 
        httpOnly: true,
        maxAge: 3600000 // 1 hora de validade
    });

    res.status(200).json({ 
        mensagem: "Login realizado com sucesso!", 
        usuario: usuarioEncontrado.name 
    });
};

export { usuarios };