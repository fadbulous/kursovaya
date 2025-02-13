const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';  // Замените на свой секретный ключ

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ error: 'Необходима авторизация' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Неверный токен' });
  }
};
