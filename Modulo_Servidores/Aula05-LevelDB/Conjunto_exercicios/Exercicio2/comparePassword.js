import bcrypt from 'bcrypt';

const comparePassword = async (senhaDigitada, hashArmazenado) => {
    // Compara a senha "123" com o hash "$2b$10$..."
    const match = await bcrypt.compare(senhaDigitada, hashArmazenado);
    return match; // Retorna true ou false
};

export default comparePassword;