// Banco de dados local
let clientes = [];
let proximoIdCliente = 1;

// Funções Auxiliares
const validarId = (id, res) => {
    if (isNaN(id)) {
        res.status(400).json({ erro: 'O ID deve ser um número inteiro.' });
        return false;
    }
    return true;
};

const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Controladores
export const getAllCustomers = (req, res) => {
    res.status(200).json(clientes);
};

export const getCustomerById = (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });
    
    res.status(200).json(cliente);
};

export const createCustomer = (req, res) => {
    const { name, email } = req.body;

    if (!name || typeof name !== 'string') return res.status(400).json({ erro: 'Nome inválido.' });
    if (!email || !validarEmail(email)) return res.status(400).json({ erro: 'Email inválido.' });

    const novoCliente = { id: proximoIdCliente++, name, email };
    clientes.push(novoCliente);
    res.status(201).json(novoCliente);
};

export const updateCustomer = (req, res) => {
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
};

export const deleteCustomer = (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Cliente não encontrado' });

    clientes.splice(index, 1);
    res.status(200).json({ mensagem: 'Cliente removido.' });
};