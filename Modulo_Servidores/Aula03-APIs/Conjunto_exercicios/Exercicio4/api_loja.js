import express from 'express';

const app = express();
const PORTA = 3000;

app.use(express.json());

// --- BANCO DE DADOS EM MEMÓRIA ---
let produtos = [];
let pedidos = [];
let clientes = [];

let proximoIdProduto = 1;
let proximoIdPedido = 1;
let proximoIdCliente = 1;

// --- FUNÇÕES AUXILIARES DE VALIDAÇÃO (NOVO) ---
const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validarId = (id, res) => {
    if (isNaN(id)) {
        res.status(400).json({ erro: 'O ID informado deve ser um número inteiro.' });
        return false;
    }
    return true;
};

// ==========================================
// ROTAS DE PRODUTOS
// ==========================================

app.get('/api/product', (req, res) => {
    res.json(produtos);
});

app.get('/api/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return; 

    const produto = produtos.find(p => p.id === id);
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(produto);
});

app.post('/api/product', (req, res) => {
    const { name, value } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ erro: "O campo 'name' é obrigatório e deve ser um texto." });
    }
    if (!value || isNaN(value) || value <= 0) {
        return res.status(400).json({ erro: "O campo 'value' deve ser um número positivo." });
    }

    const novoProduto = {
        id: proximoIdProduto++,
        name: name.trim(),
        value: parseFloat(value).toFixed(2) // Garante 2 casas decimais
    };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.put('/api/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const { name, value } = req.body;
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ erro: 'Produto não encontrado' });

    if (name && (typeof name !== 'string' || name.trim() === '')) {
        return res.status(400).json({ erro: "Nome inválido." });
    }
    if (value && (isNaN(value) || value <= 0)) {
        return res.status(400).json({ erro: "Valor inválido." });
    }

    produtos[index] = {
        ...produtos[index],
        name: name ? name.trim() : produtos[index].name,
        value: value ? parseFloat(value).toFixed(2) : produtos[index].value
    };
    res.json(produtos[index]);
});

app.delete('/api/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Produto não encontrado' });

    produtos.splice(index, 1);
    res.json({ mensagem: `Produto ID ${id} removido com sucesso.` });
});

// ==========================================
// ROTAS DE PEDIDOS
// ==========================================

app.get('/api/order', (req, res) => {
    res.json(pedidos);
});

// GET SEARCH (Questão 3) - Mantido ANTES do :id
app.get('/api/order/search', (req, res) => {
    const { product_id, customer_id } = req.query;
    let resultados = pedidos;

    if (customer_id) {
        if (isNaN(customer_id)) return res.status(400).json({ erro: 'customer_id deve ser numérico.' });
        resultados = resultados.filter(p => p.customerId === parseInt(customer_id));
    }

    if (product_id) {
        if (isNaN(product_id)) return res.status(400).json({ erro: 'product_id deve ser numérico.' });
        resultados = resultados.filter(p => p.items.some(item => item.id === parseInt(product_id)));
    }

    res.json(resultados);
});

app.get('/api/order/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' });
    res.json(pedido);
});

app.post('/api/order', (req, res) => {
    const { items, customerId } = req.body;

    if (!customerId || isNaN(customerId)) {
        return res.status(400).json({ erro: 'O pedido deve ter um ID de cliente válido (customerId).' });
    }
    const clienteExiste = clientes.find(c => c.id === customerId);
    if (!clienteExiste) {
        return res.status(404).json({ erro: `Cliente ID ${customerId} não existe.` });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ erro: 'O pedido deve conter no mínimo 1 produto.' });
    }

    for (const item of items) {
        const produtoExiste = produtos.find(p => p.id === item.id);
        if (!produtoExiste) {
            return res.status(400).json({ erro: `Produto ID ${item.id} não existe.` });
        }
        if (!item.quantity || item.quantity <= 0) {
            return res.status(400).json({ erro: `Quantidade inválida para o produto ID ${item.id}.` });
        }
    }

    const novoPedido = {
        id: proximoIdPedido++,
        customerId: customerId,
        items: items
    };

    pedidos.push(novoPedido);
    res.status(201).json(novoPedido);
});

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
    res.json(pedidos[index]);
});

app.delete('/api/order/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const index = pedidos.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Pedido não encontrado' });

    pedidos.splice(index, 1);
    res.json({ mensagem: `Pedido ID ${id} removido.` });
});

// ==========================================
// ROTAS DE CLIENTES
// ==========================================

app.get('/api/customer', (req, res) => {
    res.json(clientes);
});

app.get('/api/customer/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json(cliente);
});

app.post('/api/customer', (req, res) => {
    const { name, email } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ erro: 'Nome é obrigatório e deve ser texto.' });
    }
    if (!email || !validarEmail(email)) {
        return res.status(400).json({ erro: 'E-mail inválido ou mal formatado.' });
    }

    const novoCliente = {
        id: proximoIdCliente++,
        name: name.trim(),
        email: email.trim()
    };
    clientes.push(novoCliente);
    res.status(201).json(novoCliente);
});

app.put('/api/customer/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const { name, email } = req.body;
    const index = clientes.findIndex(c => c.id === id);

    if (index === -1) return res.status(404).json({ erro: 'Cliente não encontrado' });

    if (name && typeof name !== 'string') return res.status(400).json({ erro: 'Nome inválido.' });
    if (email && !validarEmail(email)) return res.status(400).json({ erro: 'E-mail inválido.' });

    clientes[index] = {
        ...clientes[index],
        name: name || clientes[index].name,
        email: email || clientes[index].email
    };
    res.json(clientes[index]);
});

app.delete('/api/customer/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Cliente não encontrado' });

    clientes.splice(index, 1);
    res.json({ mensagem: `Cliente ID ${id} removido com sucesso.` });
});

// ==========================================
// SERVER
// ==========================================
app.listen(PORTA, () => {
    console.log(`Loja rodando em: http://localhost:${PORTA}`);
});