import { Level } from 'level';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração para achar o caminho certo da pasta
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// O banco ficará salvo na pasta 'db_data' na raiz do projeto
const dbPath = path.join(__dirname, '../../db_data');

const db = new Level(dbPath, { valueEncoding: 'json' });

export default db;