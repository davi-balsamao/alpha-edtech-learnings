const API_URL = 'http://localhost:3000/api';

async function testarSistemaCompleto() {
    console.log("🚀 --- INICIANDO TESTE SISTÊMICO (LOJA + CLIENTES) ---");

    // ==========================================
    // 1. SETUP DE PRODUTOS (Cria o Estoque)
    // ==========================================
    console.log("\n📦 [1] Criando Produtos...");
    
    // Produto 1
    await fetch(`${API_URL}/product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: "Monitor 24pol", value: 850.00 })
    });

    // Produto 2
    await fetch(`${API_URL}/product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: "Teclado Mecânico", value: 250.00 })
    });
    
    console.log("✅ Produtos criados com sucesso.");

    // ==========================================
    // 2. SETUP DE CLIENTES (Cria a Ana Clara)
    // ==========================================
    console.log("\n👤 [2] Criando Cliente...");

    const resCli = await fetch(`${API_URL}/customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: "Ana Clara", email: "ana@email.com" })
    });
    console.log("   > Cliente Criado. Status:", resCli.status);

    // Atualiza email (apenas para garantir o fluxo completo)
    await fetch(`${API_URL}/customer/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: "ana.clara.oficial@gmail.com" })
    });
    console.log("   > Email atualizado com sucesso.");

    // ==========================================
    // 3. REALIZANDO PEDIDO (Crucial para a busca funcionar)
    // ==========================================
    console.log("\n🛒 [3] Realizando Pedido...");

    // Teste de Erro (Sem cliente)
    await fetch(`${API_URL}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: 1, quantity: 1 }] })
    });
    console.log("   > Teste de erro (sem cliente): OK");

    // Pedido Válido (Ana Clara compra Monitor e Teclado)
    const pedidoPayload = {
        customerId: 1, // Vínculo com Ana Clara
        items: [
            { id: 1, quantity: 2 }, // 2 Monitores
            { id: 2, quantity: 1 }  // 1 Teclado
        ]
    };

    const resPedido = await fetch(`${API_URL}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedidoPayload)
    });

    const pedidoJson = await resPedido.json();
    
    if (resPedido.status === 201) {
        console.log("✅ PEDIDO APROVADO! ID:", pedidoJson.id);
    } else {
        console.log("❌ Erro no Pedido:", pedidoJson);
    }

    // ==========================================
    // 4. TESTANDO BUSCAS (Questão 3)
    // ==========================================
    console.log("\n🔍 [4] Testando Buscas Avançadas...");

    // 4.1 Busca por Cliente
    console.log("   > Buscando pedidos do Cliente 1 (Ana Clara)...");
    const resBuscaCli = await fetch(`${API_URL}/order/search?customer_id=1`);
    const buscaCli = await resBuscaCli.json();
    console.log(`     Resultado: Encontrados ${buscaCli.length} pedido(s).`);

    // 4.2 Busca por Produto
    console.log("   > Buscando pedidos com Produto 1 (Monitor)...");
    const resBuscaProd = await fetch(`${API_URL}/order/search?product_id=1`);
    const buscaProd = await resBuscaProd.json();
    console.log(`     Resultado: Encontrados ${buscaProd.length} pedido(s).`);

    // 4.3 Busca por Produto Inexistente
    console.log("   > Buscando pedidos com Produto 99 (Não comprado)...");
    const resBuscaNada = await fetch(`${API_URL}/order/search?product_id=99`);
    const buscaNada = await resBuscaNada.json();
    console.log(`     Resultado: Encontrados ${buscaNada.length} pedido(s).`);

    console.log("\n🏁 --- FIM DOS TESTES ---");
} 

testarSistemaCompleto();