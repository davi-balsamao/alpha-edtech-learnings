import bcrypt from 'bcrypt';

const hashPassword = async (senha) => {
    const saltRounds = 10; 
    const hash = await bcrypt.hash(senha, saltRounds);
    return hash;
};

export default hashPassword;