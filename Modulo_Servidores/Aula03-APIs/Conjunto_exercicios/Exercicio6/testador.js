const API_URL = 'http://localhost:3000/api';

async function testarCORS() {
    console.log("🚫 --- TESTE DE BLOQUEIO CORS (QUESTÃO 6) ---");

    // 1. Simula um acesso vindo de um site pirata
    console.log("\n🏴‍☠️ [1] Tentando acessar vindo de 'http://site-malicioso.com'...");
    
    const resHacker = await fetch(`${API_URL}/product`, {
        method: 'GET',
        headers: { 
            'Origin': 'http://site-malicioso.com' // Cabeçalho forçado
        }
    });

    if (resHacker.status === 403) {
        console.log("✅ SUCESSO: O servidor bloqueou o acesso externo!");
        console.log("   Resposta:", await resHacker.json());
    } else {
        console.log("❌ FALHA: O servidor permitiu o acesso indevido.");
    }

    // 2. Simula acesso legítimo (ou sem origem, como nosso script normal)
    console.log("\n😇 [2] Testando acesso normal (Origem permitida/local)...");
    const resNormal = await fetch(`${API_URL}/product`);
    
    if (resNormal.status === 200) {
        console.log("✅ SUCESSO: Acesso legítimo continua funcionando.");
    } else {
        console.log("❌ FALHA: Quebramos o acesso normal.");
    }

    console.log("-------------------------------------------------");
} 

testarCORS();