const verifyToken = require('./verifyToken');

function authenticate(req, res, next) {
  // Получаем токен из заголовка Authorization
  const token = req.headers['authorization'];
  
  // Если токен отсутствует, возвращаем ошибку 401 (Unauthorized)
  if (!token) {
    return res.status(401).json({ message: 'Отсутствует токен аутентификации' });
  }
  
  try {
    // Проверяем токен
    const decoded = verifyToken(token);
    
    // Проверяем, содержит ли объект decoded поле role
    if (!decoded.role) {
      throw new Error('Токен не содержит информации о роли пользователя');
    }

    // Добавляем информацию о пользователе в объект req
    req.user = decoded;
    next(); // Переходим к следующему middleware
  } catch (error) {
    console.error('Ошибка при аутентификации:', error);
    res.status(401).json({ message: 'Неверный токен аутентификации' });
  }
}

module.exports = authenticate;