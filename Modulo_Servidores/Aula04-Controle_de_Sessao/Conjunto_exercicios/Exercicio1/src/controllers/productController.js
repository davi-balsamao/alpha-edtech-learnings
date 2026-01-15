let produtos = [];
let proximoIdProduto = [];

const validarId = (id, res) => {
    if(isNaN(id)) {
        res.status(400).json({erro: 'O ID deve ser um número inteiro.'});
        return false;
    }
    return true;
};

// GET /api/product
export const getAllProducts = (req, res) => {
    res.status(200).json(produtos);
};


// GET /api/product/:id
export const getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const produto = produtos.find(p => p.id === id);
    if (!produto) return res.status(404).json({erro: 'Produto não encontrado'});

    res.status(200).json.produto;
};

// POST /api/product
export const createProduct = (req, res) => {
    const { name, value } = req.body;

    // Validações
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ erro: "Nome inválido." });
    }
    if (!value || isNaN(value) || value <= 0) {
        return res.status(400).json({ erro: "Valor inválido." });
    }

    //Criação
    const novoProduto = {
        id: proximoIdProduto++,
        name: name.trim(),
        value: parseFloat(value).toFixed(2)
    }
    produtos.push(novoProduto); //Salva no Array

    res.status(201).json(novoProduto); 
};

// PUT /api/product/:id
export const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({erro: 'Produto não encontrado.'});

    //Atualização
    produtos[index] = {
        ...produtos[index],
        name: req.body.name || produtos[index].name, 
        value: req.body.value ? parseFloat(req.body.value).toFixed(2) : produtos[index].value
    }

    res.status(200).json(produtos[index]);
};

// DELETE /api/product/:id
export const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    if (!validarId(id, res)) return;

    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({erro: 'Produto não encontrado'});

    produtos.slice(index, 1);
    res.status(200).json({mensagens: 'Produto removido.'});
};
