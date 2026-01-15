let pedidos = [];
let proximoIdPedido = 1;

const validarId = (id, res) => {
    if (isNaN(id)) {
        res.status(400).json({ erro: 'O ID deve ser um número inteiro.' });
        return false;
    }
    return true;
};

// Controladores
export const getAllOrders = (req, res) => {
    res.status(200).json(pedidos);
};

// Busca (Search)
export const searchOrders = (req, res) => {
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
};

export const getOrderById = (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' });
    
    res.status(200).json(pedido);
};

export const createOrder = (req, res) => {
    const { items, customerId } = req.body;

    if (!customerId || isNaN(customerId)) return res.status(400).json({ erro: 'ID Cliente inválido.' });
    if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ erro: 'Sem itens.' });

    const novoPedido = { id: proximoIdPedido++, customerId, items };
    pedidos.push(novoPedido);
    res.status(201).json(novoPedido);
};

export const updateOrder = (req, res) => {
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
};

export const deleteOrder = (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const index = pedidos.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Pedido não encontrado' });

    pedidos.splice(index, 1);
    res.status(200).json({ mensagem: 'Pedido removido.' });
};