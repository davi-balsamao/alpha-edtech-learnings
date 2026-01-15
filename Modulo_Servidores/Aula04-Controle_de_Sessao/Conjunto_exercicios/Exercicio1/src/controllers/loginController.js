import crypto from 'crypto'; 

// --- 1. BANCO DE DADOS DE USUÁRIOS (Na Memória) ---
const usuarios = [
    { 
        id: 1, 
        username: "admin", 
        password: "123", // Em produção, isso seria criptografado!
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

// --- 2. LÓGICA DE LOGIN ---
export const login = (req, res) => {
    const { username, password } = req.body;

    // A. Verificar se mandou os dados
    if (!username || !password) {
        return res.status(400).json({ erro: "Usuário e senha obrigatórios." });
    }

    // B. Procurar o usuário na lista
    // (Verifica se usuario E senha batem)
    const usuarioEncontrado = usuarios.find(
        u => u.username === username && u.password === password
    );

    if (!usuarioEncontrado) {
        return res.status(401).json({ erro: "Credenciais inválidas." });
    }

    // C. Gerar o Crachá (Session Token)
    // Gera uma string tipo: "550e8400-e29b-41d4-a716-446655440000"
    const novoToken = crypto.randomUUID(); 

    // D. Salvar o token no "Banco de Dados" (para conferirmos depois)
    usuarioEncontrado.sessionToken = novoToken;

    // E. Colar o Crachá no Navegador (Cookie) 
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

// --- 3. LÓGICA DE LOGOUT (Opcional, mas útil) ---
export const logout = (req, res) => {
    // Para deslogar, basta apagar o cookie
    res.clearCookie('session_id');
    res.status(200).json({ mensagem: "Logout realizado." });
};

// Exportamos a lista de usuários para o Porteiro (Middleware) poder consultar depois
export { usuarios };