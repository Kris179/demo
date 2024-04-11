const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticate = require('../middleware/auth');

// Middleware для проверки роли пользователя
function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен. Только администратор может выполнить данное действие' });
  }
  next();
}

// Маршрут для просмотра всех заявлений администратором
router.get('/papers', authenticate, isAdmin, async (req, res) => {
  try {
    // Запрос к базе данных для получения всех заявлений
    const allPapers = await pool.query('SELECT * FROM paper');
    res.json(allPapers.rows); // Отправляем все заявления в формате JSON
  } catch (error) {
    console.error('Ошибка при получении всех заявлений:', error);
    res.status(500).json({ message: 'Ошибка сервера при получении всех заявлений' });
  }
});

// Маршрут для изменения статуса заявления администратором
router.put('/papers/:paperId', authenticate, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const { paperId } = req.params;

    // Обновляем статус заявления в базе данных
    const updatedPaper = await pool.query(
      'UPDATE paper SET status = $1 WHERE paper_id = $2 RETURNING *',
      [status, paperId]
    );

    res.json(updatedPaper.rows[0]); // Отправляем обновленное заявление в формате JSON
  } catch (error) {
    console.error('Ошибка при изменении статуса заявления:', error);
    res.status(500).json({ message: 'Ошибка сервера при изменении статуса заявления' });
  }
});

module.exports = router;