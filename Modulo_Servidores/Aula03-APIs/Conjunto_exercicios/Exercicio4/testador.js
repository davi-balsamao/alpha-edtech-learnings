const API_URL = 'http://localhost:3000/api';

async function testarValidacoes() {
    console.log("🛡️ --- INICIANDO TESTES DE BLINDAGEM (QUESTÃO 4) ---");

    // ==========================================
    // 1. TESTE DE EMAIL INVÁLIDO
    // ==========================================
    console.log("\n🧪 [1] Tentando criar cliente com email errado...");
    const resBadEmail = await fetch(`${API_URL}/customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: "Hacker", email: "email_sem_arroba.com" })
    });
    
    if (resBadEmail.status === 400) {
        console.log("✅ Sucesso: API bloqueou email inválido.");
    } else {
        console.log("❌ Falha: API aceitou email ruim.");
    }

    // ==========================================
    // 2. TESTE DE DADOS FALTANTES (NOME)
    // ==========================================
    console.log("\n🧪 [2] Tentando criar produto sem nome...");
    const resBadProd = await fetch(`${API_URL}/product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: 100 }) // Faltou o name
    });

    if (resBadProd.status === 400) {
        console.log("✅ Sucesso: API bloqueou produto sem nome.");
    } else {
        console.log("❌ Falha: API aceitou produto incompleto.");
    }

    // ==========================================
    // 3. TESTE DE PEDIDO SEM CLIENTE
    // ==========================================
    console.log("\n🧪 [3] Tentando criar pedido sem cliente...");
    const resBadOrder = await fetch(`${API_URL}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: 1, quantity: 1 }] })
    });

    if (resBadOrder.status === 400) {
        console.log("✅ Sucesso: API exigiu cliente no pedido.");
    } else {
        console.log("❌ Falha: API aceitou pedido órfão.");
    }

    // ==========================================
    // 4. TESTE DE ID INVÁLIDO NA URL
    // ==========================================
    console.log("\n🧪 [4] Tentando buscar ID texto (SQL Injection simples)...");
    const resBadId = await fetch(`${API_URL}/customer/abc`); // ID não é número
    
    if (resBadId.status === 400) {
        console.log("✅ Sucesso: API bloqueou ID não numérico.");
    } else {
        console.log("❌ Falha: API aceitou ID inválido.");
    }

    console.log("\n🏁 --- FIM DOS TESTES DE SEGURANÇA ---");
} 

testarValidacoes();