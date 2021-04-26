import bcrypt from 'bcrypt';

module.exports = (password, hash) => {
    const result = bcrypt.compareSync(password, hash);
    return result;
}