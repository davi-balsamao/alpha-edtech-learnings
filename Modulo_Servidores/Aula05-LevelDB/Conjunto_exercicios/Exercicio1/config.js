import dotenv from 'dotenv';

dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY || 'chave-padrao-insegura';
export const PORTA = process.env.PORTA || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';