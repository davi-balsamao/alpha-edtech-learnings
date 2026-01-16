import db from '../database/index.js';

// Função auxiliar para gerar ID automático para Pedidos
async function getNextId() {
    try {
        const currentId = await db.get('meta:nextOrderId');
        await db.put('meta:nextOrderId', currentId + 1);
        return currentId;
    } catch (error) {
        // Se não existe, começa do 1
        await db.put('meta:nextOrderId', 2);
        return 1;
    }
}

// --- CONTROLADORES ---

// 1. CRIAR PEDIDO (POST /api/order)
export const createOrder = async (req, res) => {
    const { customerId, items } = req.body;

    if (!customerId || !items || items.length === 0) {
        return res.status(400).json({ erro: "Dados inválidos. Informe cliente e itens." });
    }

    try {
        const id = await getNextId();
        
        // Cria o objeto do pedido com data e status
        const novoPedido = {
            id: id,
            customerId: customerId,
            items: items,
            status: "Aberto",
            createdAt: new Date().toISOString()
        };

        // Salva no banco com a chave 'order:ID'
        await db.put(`order:${id}`, novoPedido);

        res.status(201).json({ mensagem: "Pedido criado com sucesso", pedido: novoPedido });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao salvar pedido." });
    }
};

// 2. LISTAR PEDIDOS (GET /api/order)
export const getAllOrders = async (req, res) => {
    try {
        const pedidos = [];
        // Varre o banco buscando chaves que começam com "order:"
        for await (const [key, value] of db.iterator()) {
            if (key.startsWith('order:')) {
                pedidos.push(value);
            }
        }
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar pedidos." });
    }
};

// 3. BUSCAR PEDIDO POR ID (GET /api/order/:id)
export const getOrderById = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido.' });

    try {
        const pedido = await db.get(`order:${id}`);
        res.status(200).json(pedido);
    } catch (error) {
        res.status(404).json({ erro: 'Pedido não encontrado.' });
    }
};

// 4. ATUALIZAR PEDIDO (PUT /api/order/:id)
export const updateOrder = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido.' });

    try {
        const key = `order:${id}`;
        const pedidoAntigo = await db.get(key);

        // Atualiza apenas o que foi enviado (ou mantém o antigo)
        const pedidoAtualizado = {
            ...pedidoAntigo,
            items: req.body.items || pedidoAntigo.items,
            status: req.body.status || pedidoAntigo.status
        };

        await db.put(key, pedidoAtualizado);
        res.status(200).json({ mensagem: "Pedido atualizado", pedido: pedidoAtualizado });

    } catch (error) {
        res.status(404).json({ erro: 'Pedido não encontrado.' });
    }
};

// 5. DELETAR PEDIDO (DELETE /api/order/:id)
export const deleteOrder = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido.' });

    try {
        const key = `order:${id}`;
        await db.get(key); // Verifica se existe antes
        await db.del(key); // Apaga
        res.status(200).json({ mensagem: 'Pedido removido.' });
    } catch (error) {
        res.status(404).json({ erro: 'Pedido não encontrado.' });
    }
};

// 6. BUSCA AVANÇADA (GET /api/order/search)
export const getOrdersByQuery = async (req, res) => {
    const { customer_id } = req.query;

    if (!customer_id) return res.status(400).json({ erro: "Informe customer_id na busca." });

    try {
        const resultados = [];
        for await (const [key, value] of db.iterator()) {
            if (key.startsWith('order:') && value.customerId == customer_id) {
                resultados.push(value);
            }
        }
        res.status(200).json(resultados);
    } catch (error) {
        res.status(500).json({ erro: "Erro na busca." });
    }
};