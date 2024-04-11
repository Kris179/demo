const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db'); // Используем нашу обертку Knex.js для базы данных

// Регистрация пользователя
router.post('/register', async (req, res) => {
  try {
    const { fio, phone, email, login, password } = req.body;
    
    // Проверяем, существует ли пользователь с таким логином
    const userExist = await db('users').where({ login }).first();
    if (userExist) {
      return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
    }

    // Добавляем пользователя в базу данных
    const newUser = await db('users').insert({
      fio,
      phone,
      email,
      login,
      password,
      role: 'user',
    }).returning('*');

    res.status(201).json(newUser[0]);
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    res.status(500).json({ message: 'Ошибка сервера при регистрации пользователя' });
  }
});

// Авторизация пользователя
router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    
    // Проверяем, существует ли пользователь с таким логином и паролем
    const user = await db('users').where({ login, password }).first();
    if (!user) {
      return res.status(401).json({ message: 'Неправильный логин или пароль' });
    }

    // Генерация токена с информацией о роли пользователя
    const token = jwt.sign({ user_id: user.user_id, role: user.role }, 'tR5#8f!q2@HjL$p&uFzW');
    // Отправка токена клиенту
    res.json({ token });
  } catch (error) {
    console.error('Ошибка при авторизации:', error);
    res.status(500).json({ message: 'Ошибка сервера при авторизации пользователя' });
  }
});

module.exports = router;