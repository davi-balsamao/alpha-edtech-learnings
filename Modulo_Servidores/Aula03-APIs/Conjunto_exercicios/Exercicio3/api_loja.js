import express from 'express';

const app = express();
const PORTA = 3000;

app.use(express.json());

let produtos = [];
let pedidos = [];
let clientes = []; // Adicionado para a Questão 1

let proximoIdProduto = 1;
let proximoIdPedido = 1;
let proximoIdCliente = 1; // Adicionado para a Questão 1

// ==========================================
// ROTAS DE PRODUTOS (Transcrito do Ex. 9)
// ==========================================

app.get('/api/product', (req, res) => {
    res.json(produtos);
});

app.get('/api/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(produto);
});

app.post('/api/product', (req, res) => {
    const { name, value } = req.body;
    if (!name || !value) return res.status(400).json({ erro: 'Dados incompletos' });

    const novoProduto = {
        id: proximoIdProduto++,
        name,
        value: parseFloat(value).toFixed(2)
    };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.put('/api/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, value } = req.body;
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ erro: 'Produto não encontrado' });

    produtos[index] = {
        ...produtos[index],
        name: name || produtos[index].name,
        value: value ? parseFloat(value).toFixed(2) : produtos[index].value
    };
    res.json(produtos[index]);
});

app.delete('/api/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ erro: 'Produto não encontrado' });

    produtos.splice(index, 1);
    res.json({ mensagem: `Produto ID ${id} removido com sucesso.` });
});

// ==========================================
// ROTAS DE PEDIDOS (Transcrito do Ex. 9)
// ==========================================

app.get('/api/order', (req, res) => {
    res.json(pedidos);
});

app.get('/api/order/search', (req, res) => {
    const { product_id, customer_id } = req.query;
    let resultados = pedidos; 

    if (customer_id) {
        const idCliente = parseInt(customer_id);
        resultados = resultados.filter(p => p.customerId === idCliente);
    }

    if (product_id) {
        const idProduto = parseInt(product_id);
        resultados = resultados.filter(p => 
            p.items.some(item => item.id === idProduto)
        );
    }

    res.json(resultados);
});

app.get('/api/order/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' });
    res.json(pedido);
});

app.post('/api/order', (req, res) => {
    const { items, customerId } = req.body; 

    if (!customerId) {
        return res.status(400).json({ erro: 'O pedido deve estar associado a um customerId.' });
    }

    const clienteExiste = clientes.find(c => c.id === customerId);
    if (!clienteExiste) {
        return res.status(404).json({ erro: `Cliente com ID ${customerId} não encontrado. Pedido recusado.` });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ erro: 'O pedido deve conter um array de items.' });
    }

    for (const item of items) {
        const produtoExiste = produtos.find(p => p.id === item.id);
        if (!produtoExiste) {
            return res.status(400).json({ erro: `Produto com ID ${item.id} não existe. Pedido cancelado.` });
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
    const { items } = req.body;
    const index = pedidos.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ erro: 'Pedido não encontrado' });

    pedidos[index].items = items || pedidos[index].items;
    res.json(pedidos[index]);
});

app.delete('/api/order/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = pedidos.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Pedido não encontrado' });

    pedidos.splice(index, 1);
    res.json({ mensagem: `Pedido ID ${id} removido.` });
});

// ==========================================
// ROTAS DE CLIENTES (Questão 1)
// ==========================================

app.get('/api/customer', (req, res) => {
    res.json(clientes);
});

app.get('/api/customer/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);

    if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });
    
    res.json(cliente);
});

app.post('/api/customer', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ erro: 'Dados incompletos. Nome e Email são obrigatórios.' });
    }

    const novoCliente = {
        id: proximoIdCliente++,
        name,
        email
    };

    clientes.push(novoCliente);
    res.status(201).json(novoCliente);
});

app.put('/api/customer/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const index = clientes.findIndex(c => c.id === id);

    if (index === -1) return res.status(404).json({ erro: 'Cliente não encontrado' });

    clientes[index] = {
        ...clientes[index],
        name: name || clientes[index].name,
        email: email || clientes[index].email
    };

    res.json(clientes[index]);
});

app.delete('/api/customer/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c.id === id);

    if (index === -1) return res.status(404).json({ erro: 'Cliente não encontrado' });

    clientes.splice(index, 1);
    res.json({ mensagem: `Cliente ID ${id} removido com sucesso.` });
});

app.listen(PORTA, () => {
    console.log(`Loja rodando em: http://localhost:${PORTA}`);
});