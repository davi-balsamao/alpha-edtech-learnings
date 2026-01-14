import express from 'express';

const app = express();
const PORTA = 3000;

app.use(express.json());

// --- 1. MIDDLEWARES DE SEGURANÇA (QUESTÕES 5 e 6) ---
app.use((req, res, next) => {
    // Anti-Clickjacking
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
    next();
});

app.use((req, res, next) => {
    // CORS Manual
    const allowedOrigin = 'http://localhost:3000';
    const origin = req.headers.origin;

    if (origin && origin !== allowedOrigin) {
        // EXPLICIT STATUS 403 (Forbidden)
        return res.status(403).json({ erro: 'CORS Policy: Acesso negado.' });
    }
    
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    next();
});

// --- DADOS EM MEMÓRIA ---
let produtos = [];
let pedidos = [];
let clientes = [];

let proximoIdProduto = 1;
let proximoIdPedido = 1;
let proximoIdCliente = 1;

// --- VALIDAÇÕES ---
const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validarId = (id, res) => {
    if (isNaN(id)) {
        res.status(400).json({ erro: 'O ID deve ser um número inteiro.' });
        return false;
    }
    return true;
};

// ==========================================
// ROTAS DE PRODUTOS
// ==========================================

app.get('/api/product', (req, res) => {
    // EXPLICIT STATUS 200 (OK)
    res.status(200).json(produtos);
});

app.get('/api/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const produto = produtos.find(p => p.id === id);
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' }); // 404
    
    res.status(200).json(produto); // 200
});

app.post('/api/product', (req, res) => {
    const { name, value } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ erro: "Nome inválido." }); // 400
    }
    if (!value || isNaN(value) || value <= 0) {
        return res.status(400).json({ erro: "Valor inválido." }); // 400
    }

    const novoProduto = {
        id: proximoIdProduto++,
        name: name.trim(),
        value: parseFloat(value).toFixed(2)
    };
    produtos.push(novoProduto);
    
    // EXPLICIT STATUS 201 (Created)
    res.status(201).json(novoProduto);
});

app.put('/api/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Produto não encontrado' });

    produtos[index] = {
        ...produtos[index],
        name: req.body.name || produtos[index].name,
        value: req.body.value ? parseFloat(req.body.value).toFixed(2) : produtos[index].value
    };
    
    res.status(200).json(produtos[index]); // 200
});

app.delete('/api/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Produto não encontrado' });

    produtos.splice(index, 1);
    res.status(200).json({ mensagem: 'Produto removido.' }); // 200
});

// ==========================================
// ROTAS DE PEDIDOS (CORRIGIDO)
// ==========================================

app.get('/api/order', (req, res) => {
    res.status(200).json(pedidos);
});

// Busca Avançada (Search)
app.get('/api/order/search', (req, res) => {
    const { product_id, customer_id } = req.query;
    let resultados = pedidos;

    try {
        if (customer_id) {
            if (isNaN(customer_id)) throw new Error("ID Cliente inválido");
            resultados = resultados.filter(p => p.customerId === parseInt(customer_id));
        }
        if (product_id) {
            if (isNaN(product_id)) throw new Error("ID Produto inválido");
            resultados = resultados.filter(p => p.items.some(item => item.id === parseInt(product_id)));
        }
        res.status(200).json(resultados);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// GET :id (ESTAVA FALTANDO ISSO AQUI)
app.get('/api/order/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' });
    
    res.status(200).json(pedido);
});

// POST (Criar Pedido)
app.post('/api/order', (req, res) => {
    const { items, customerId } = req.body;

    if (!customerId || isNaN(customerId)) return res.status(400).json({ erro: 'ID Cliente inválido.' });
    if (!clientes.find(c => c.id === customerId)) return res.status(404).json({ erro: 'Cliente não existe.' });
    if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ erro: 'Sem itens.' });

    for (const item of items) {
        if (!produtos.find(p => p.id === item.id)) return res.status(400).json({ erro: `Produto ${item.id} inexistente.` });
    }

    const novoPedido = { id: proximoIdPedido++, customerId, items };
    pedidos.push(novoPedido);
    res.status(201).json(novoPedido);
});

// PUT (Atualizar Pedido )
app.put('/api/order/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const { items } = req.body;
    const index = pedidos.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Pedido não encontrado' });

    if (items && (!Array.isArray(items) || items.length === 0)) {
        return res.status(400).json({ erro: 'Lista de itens inválida.' });
    }

    pedidos[index].items = items || pedidos[index].items;
    res.status(200).json(pedidos[index]);
});

// DELETE (Remover Pedido)
app.delete('/api/order/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const index = pedidos.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Pedido não encontrado' });

    pedidos.splice(index, 1);
    res.status(200).json({ mensagem: 'Pedido removido.' });
});

// ==========================================
// ROTAS DE CLIENTES
// ==========================================

app.get('/api/customer', (req, res) => {
    res.status(200).json(clientes);
});

app.get('/api/customer/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });
    
    res.status(200).json(cliente);
});

app.post('/api/customer', (req, res) => {
    const { name, email } = req.body;

    if (!name || typeof name !== 'string') return res.status(400).json({ erro: 'Nome inválido.' });
    if (!email || !validarEmail(email)) return res.status(400).json({ erro: 'Email inválido.' });

    const novoCliente = { id: proximoIdCliente++, name, email };
    clientes.push(novoCliente);
    res.status(201).json(novoCliente);
});

app.put('/api/customer/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Cliente não encontrado' });

    clientes[index] = { 
        ...clientes[index], 
        name: req.body.name || clientes[index].name,
        email: req.body.email || clientes[index].email
    };
    res.status(200).json(clientes[index]);
});

app.delete('/api/customer/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Cliente não encontrado' });

    clientes.splice(index, 1);
    res.status(200).json({ mensagem: 'Cliente removido.' });
});

// --- MIDDLEWARE DE ERRO GLOBAL (QUESTÃO 7) ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ erro: 'Erro Interno do Servidor.' });
});

app.listen(PORTA, () => {
    console.log(`Loja rodando com Status Codes em: http://localhost:${PORTA}`);
});