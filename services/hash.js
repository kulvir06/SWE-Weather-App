import bcrypt from 'bcrypt';

module.exports = (password) => {
    const saltRounds = 10;
    const pass = bcrypt.hashSync(password, saltRounds);
    return pass;
}