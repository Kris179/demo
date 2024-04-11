const jwt = require('jsonwebtoken');

function verifyToken(token) {
  try {
    // Проверяем токен на подлинность
    const decoded = jwt.verify(token, 'tR5#8f!q2@HjL$p&uFzW'); // Замените 'your_secret_key' на ваш секретный ключ

    // Если верификация прошла успешно, возвращаем объект с данными пользователя
    return decoded;
  } catch (error) {
    // Если возникла ошибка при верификации токена (например, истек срок действия токена), выбрасываем исключение
    throw new Error('Invalid token');
  }
}

module.exports = verifyToken;