import db from '../database/index.js';

// Função para gerar ID automático sequencial
async function getNextId() {
    try {
        const currentId = await db.get('meta:nextCustomerId');
        await db.put('meta:nextCustomerId', currentId + 1);
        return currentId;
    } catch (error) {
        // Primeira vez: começa do 1
        await db.put('meta:nextCustomerId', 2);
        return 1;
    }
}

// --- CONTROLADORES ---

// 1. CRIAR CLIENTE (POST /api/customer)
export const createCustomer = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ erro: "Nome e email são obrigatórios." });
    }

    try {
        const id = await getNextId();
        
        const novoCliente = {
            id: id,
            name: name,
            email: email,
            createdAt: new Date().toISOString()
        };

        // Salva no LevelDB: customer:1, customer:2...
        await db.put(`customer:${id}`, novoCliente);

        res.status(201).json(novoCliente);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar cliente." });
    }
};

// 2. LISTAR TODOS (GET /api/customer)
export const getAllCustomers = async (req, res) => {
    try {
        const clientes = [];
        // Filtra chaves que começam com 'customer:'
        for await (const [key, value] of db.iterator()) {
            if (key.startsWith('customer:')) {
                clientes.push(value);
            }
        }
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar clientes." });
    }
};

// 3. BUSCAR POR ID (GET /api/customer/:id)
export const getCustomerById = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido.' });

    try {
        const cliente = await db.get(`customer:${id}`);
        res.status(200).json(cliente);
    } catch (error) {
        res.status(404).json({ erro: 'Cliente não encontrado.' });
    }
};

// 4. ATUALIZAR (PUT /api/customer/:id)
export const updateCustomer = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido.' });

    try {
        const key = `customer:${id}`;
        const clienteAntigo = await db.get(key);

        const clienteAtualizado = {
            ...clienteAntigo,
            name: req.body.name || clienteAntigo.name,
            email: req.body.email || clienteAntigo.email
        };

        await db.put(key, clienteAtualizado);
        res.status(200).json(clienteAtualizado);

    } catch (error) {
        res.status(404).json({ erro: 'Cliente não encontrado.' });
    }
};

// 5. DELETAR (DELETE /api/customer/:id)
export const deleteCustomer = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido.' });

    try {
        await db.del(`customer:${id}`);
        res.status(200).json({ mensagem: 'Cliente removido.' });
    } catch (error) {
        res.status(404).json({ erro: 'Cliente não encontrado.' });
    }
};