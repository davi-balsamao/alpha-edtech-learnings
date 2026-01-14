const API_URL = 'http://localhost:3000/api';

async function logStatus(passo, response, esperado) {
    const status = response.status;
    const icone = status === esperado ? '✅' : '❌';
    console.log(`${icone} [${passo}] Status: ${status} (Esperado: ${esperado})`);
}

async function testarStatusCodes() {
    console.log("🚦 --- AUDITORIA DE STATUS CODES (QUESTÃO 7) ---");

    // 1. POST (Criar) -> Deve ser 201
    const resProd = await fetch(`${API_URL}/product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: "Teste Status", value: 10 })
    });
    await logStatus("Criação de Produto", resProd, 201);

    // 2. GET (Listar) -> Deve ser 200
    const resList = await fetch(`${API_URL}/product`);
    await logStatus("Listagem de Produtos", resList, 200);

    // 3. ERRO (Cliente Inválido) -> Deve ser 400
    const resErr = await fetch(`${API_URL}/customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: "Sem Email" }) // Erro proposital
    });
    await logStatus("Validação de Erro", resErr, 400);

    // 4. NOT FOUND -> Deve ser 404
    const res404 = await fetch(`${API_URL}/product/9999`);
    await logStatus("Busca Inexistente", res404, 404);

    console.log("-------------------------------------------");
}

testarStatusCodes();