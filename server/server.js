const express = require('express');
const app = express();
const authRoutes = require('./routes/auth'); // Подключаем маршруты для регистрации и авторизации
const paperRoutes = require('./routes/papers'); // Подключаем маршруты для работы с заявлениями
const adminRoutes = require('./routes/admin'); // Подключаем маршруты для административных функций

app.use(express.json()); // Позволяет Express парсить JSON-тела запросов

// Используем маршруты для регистрации и авторизации
app.use('/auth', authRoutes); // Указываем префикс для маршрутов

// Используем маршруты для работы с заявлениями
app.use('/papers', paperRoutes); // Указываем префикс для маршрутов

// Используем маршруты для административных функций
app.use('/admin', adminRoutes); // Указываем префикс для маршрутов администратора

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}`);
});