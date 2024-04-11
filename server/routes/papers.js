const express = require('express');
const router = express.Router();
const db = require('../db'); // Импортируем Knex.js обертку для базы данных
const authenticate = require('../middleware/auth');

// Маршрут для получения всех заявлений авторизованного пользователя
router.get('/', authenticate, async (req, res) => {
  try {
    // Получаем ID пользователя из объекта req, добавленного в middleware authenticate
    const user_id = req.user.user_id;

    // Запрос к базе данных для получения заявлений пользователя
    const userPapers = await db('paper').where({ user_id });

    res.json(userPapers); // Отправляем заявления пользователя в формате JSON
  } catch (error) {
    console.error('Ошибка при получении заявлений:', error);
    res.status(500).json({ message: 'Ошибка сервера при получении заявлений' });
  }
});

// Маршрут для добавления нового заявления
router.post('/add', authenticate, async (req, res) => {
  try {
    const { car_number, description } = req.body;
    const user_id = req.user.user_id;

    // Добавляем новое заявление в базу данных
    const newPaper = await db('paper').insert({
      user_id,
      car_number,
      description,
    }).returning('*');

    res.status(201).json(newPaper[0]); // Отправляем созданное заявление в формате JSON
  } catch (error) {
    console.error('Ошибка при добавлении заявления:', error);
    res.status(500).json({ message: 'Ошибка сервера при добавлении заявления' });
  }
});

module.exports = router;