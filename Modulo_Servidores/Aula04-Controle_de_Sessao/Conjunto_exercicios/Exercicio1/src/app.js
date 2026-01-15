import express from 'express';
import productRoutes from './routes/productRoutes.js';
import customerRoutes from './routes/customerRoutes.js'; 
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORTA = 3000;

app.use(express.json());

// --- MIDDLEWARES DE SEGURANÇA ---
app.use((req, res, next) => {
    // Anti-Clickjacking
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
    next();
});

app.use((req, res, next) => {
    // CORS Manual
    const allowedOrigin = 'http://localhost:3000';
    const origin = req.headers.origin;

    if (origin && origin !== allowedOrigin) {
        // EXPLICIT STATUS 403 (Forbidden)
        return res.status(403).json({ erro: 'CORS Policy: Acesso negado.' });
    }
    
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    next();
});

// Rotas
app.use('/api/product', productRoutes);
app.use('/api/customer', customerRoutes); 
app.use('/api/order', orderRoutes);

// Inicialização
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});