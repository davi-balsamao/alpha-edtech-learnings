const API_URL = 'http://localhost:3000/api';

async function testarSegurancaIframe() {
    console.log("🔒 --- TESTE DE PROTEÇÃO CONTRA IFRAME (QUESTÃO 5) ---");

    // Fazemos uma requisição simples (Listar Produtos)
    const res = await fetch(`${API_URL}/product`);
    
    // Inspecionamos os headers que o servidor mandou de volta
    const xFrame = res.headers.get('x-frame-options');
    const csp = res.headers.get('content-security-policy');

    console.log(`\nCabeçalho Recebido (X-Frame-Options): ${xFrame}`);
    
    if (xFrame === 'DENY') {
        console.log("✅ SUCESSO: O servidor proibiu uso em iframes!");
    } else {
        console.log("❌ FALHA: Cabeçalho de proteção não encontrado.");
    }
    
    console.log("-------------------------------------------------");
} 

testarSegurancaIframe();