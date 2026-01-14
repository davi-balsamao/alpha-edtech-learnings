const API_URL = 'http://localhost:3000/api';

async function testarSistemaCompleto() {
    console.log("🚀 --- INICIANDO TESTE SISTÊMICO (LOJA + CLIENTES) ---");

    // ==========================================
    // 1. SETUP DE PRODUTOS (Dependência para Pedidos)
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
    // 2. TESTES DE CLIENTES (CRUD COMPLETO - QUESTÃO 1)
    // ==========================================
    console.log("\n👤 [2] Iniciando Testes de Clientes...");

    // 2.1 Criar Cliente
    console.log("   > Criando Cliente (Ana Clara)...");
    const resCli = await fetch(`${API_URL}/customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: "Ana Clara", email: "ana@email.com" })
    });
    console.log("   Status:", resCli.status, await resCli.json());

    // 2.2 Listar Clientes
    console.log("   > Listando Clientes...");
    const resListaCli = await fetch(`${API_URL}/customer`);
    console.log("   Lista:", await resListaCli.json());

    // 2.3 Atualizar Cliente
    console.log("   > Atualizando Email do Cliente ID 1...");
    const resUpdate = await fetch(`${API_URL}/customer/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: "ana.clara.oficial@gmail.com" })
    });
    console.log("   Atualizado:", await resUpdate.json());

    // ==========================================
    // 3. TESTES DE PEDIDOS (Depende dos Produtos)
    // ==========================================
    console.log("\n🛒 [3] Realizando Pedido...");

    const pedidoPayload = {
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
        console.log("✅ Pedido Aprovado:", pedidoJson);
    } else {
        console.log("❌ Erro no Pedido:", pedidoJson);
    }

    // ==========================================
    // 4. CHECK FINAL
    // ==========================================
    console.log("\n📊 [4] Relatório Final:");
    
    const finalClientes = await (await fetch(`${API_URL}/customer`)).json();
    const finalPedidos = await (await fetch(`${API_URL}/order`)).json();

    console.table(finalClientes); // Mostra clientes em tabela
    console.log("Total de Pedidos:", finalPedidos.length);
    console.log("--- FIM DOS TESTES ---");
}

testarSistemaCompleto();