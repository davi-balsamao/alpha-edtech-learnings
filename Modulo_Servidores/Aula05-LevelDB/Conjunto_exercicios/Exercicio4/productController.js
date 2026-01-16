import db from '../database/index.js'; // Importamos o banco LevelDB

// Função auxiliar para pegar o próximo ID disponível e incrementar
async function getNextId() {
    try {
        const currentId = await db.get('meta:nextProductId');
        await db.put('meta:nextProductId', currentId + 1);
        return currentId;
    } catch (error) {
        // Se a chave não existir (primeira vez), cria começando do 1
        await db.put('meta:nextProductId', 2); // Próximo será 2
        return 1; // Atual é 1
    }
}

// --- CONTROLADORES ---

// 1. LISTAR TODOS (GET /api/product)
export const getAllProducts = async (req, res) => {
    try {
        const produtos = [];
        // Iteramos pelo banco inteiro procurando chaves que começam com "product:"
        for await (const [key, value] of db.iterator()) {
            if (key.startsWith('product:')) {
                produtos.push(value);
            }
        }
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar produtos." });
    }
};

// 2. BUSCAR UM (GET /api/product/:id)
export const getProductById = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido.' });

    try {
        const produto = await db.get(`product:${id}`);
        res.status(200).json(produto);
    } catch (error) {
        res.status(404).json({ erro: 'Produto não encontrado.' });
    }
};

// 3. CRIAR (POST /api/product)
export const createProduct = async (req, res) => {
    // Verifica se quem está tentando criar tem permissão
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({erro: 'Acesso negado'});

    const { name, value } = req.body;

    if (!name || typeof name !== 'string') return res.status(400).json({ erro: "Nome inválido." });
    if (!value || isNaN(value) || value <= 0) return res.status(400).json({ erro: "Valor inválido." });

    try {
        const id = await getNextId(); // Pega ID automático do banco

        const novoProduto = {
            id: id,
            name: name.trim(),
            value: parseFloat(value).toFixed(2)
        };

        // Salva no LevelDB com a chave 'product:ID'
        await db.put(`product:${id}`, novoProduto);
        
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao salvar produto." });
    }
};

// 4. ATUALIZAR (PUT /api/product/:id)
export const updateProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido.' });

    try {
        const key = `product:${id}`;
        const produtoAntigo = await db.get(key); // Verifica se existe

        const produtoAtualizado = {
            ...produtoAntigo,
            name: req.body.name || produtoAntigo.name,
            value: req.body.value ? parseFloat(req.body.value).toFixed(2) : produtoAntigo.value
        };

        await db.put(key, produtoAtualizado); // Sobrescreve
        res.status(200).json(produtoAtualizado);

    } catch (error) {
        res.status(404).json({ erro: 'Produto não encontrado.' });
    }
};

// 5. DELETAR (DELETE /api/product/:id)
export const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido.' });

    try {
        const key = `product:${id}`;
        await db.get(key); // Garante que existe antes de tentar deletar
        await db.del(key); // Deleta
        res.status(200).json({ mensagem: 'Produto removido.' });
    } catch (error) {
        res.status(404).json({ erro: 'Produto não encontrado.' });
    }
};