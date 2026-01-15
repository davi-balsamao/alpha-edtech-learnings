import express from 'express';
import cookieParser from 'cookie-parser'; // Adicionado
import productRoutes from './routes/productRoutes.js';
import customerRoutes from './routes/customerRoutes.js'; 
import orderRoutes from './routes/orderRoutes.js';
import loginRoutes from './routes/loginRoutes.js';

const app = express();
app.use(cookieParser()); // Middleware para lidar com cookies
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
    const allowedOrigin = 'http://localhost:3000';
    const origin = req.headers.origin;

    if (origin && origin !== allowedOrigin) {
        return res.status(403).json({ erro: 'CORS Policy: Acesso negado.' });
    }
    
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    next();
});

// Rotas
app.use('/api/login', loginRoutes); // Adicionado
app.use('/api/product', productRoutes);
app.use('/api/customer', customerRoutes); 
app.use('/api/order', orderRoutes);

// Inicialização
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});