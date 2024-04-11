import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios'; // Импортируем axios для выполнения HTTP-запросов

function Signup() {
  const [formData, setFormData] = useState({
    fio: '',
    phone: '',
    email: '',
    login: '',
    password: '',
    agreed: false,
    errors: {}
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
      errors: { ...formData.errors, [id]: '' } // Очищаем ошибку для данного поля
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    const { fio, phone, email, login, password, agreed } = formData;

    // Валидация каждого поля
    if (!login.trim()) {
      errors.login = 'Введите уникальный логин';
    }
    if (password.length < 6) {
      errors.password = 'Пароль должен содержать минимум 6 символов';
    }
    if (!/^[\u0400-\u04FF\s]+$/.test(fio.trim())) {
      errors.fio = 'Введите ФИО на кириллице';
    }
    
    if (!/^(\+7)\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(phone)) {
      errors.phone = 'Введите телефон в формате +7(XXX)-XXX-XX-XX';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Введите корректный адрес электронной почты';
    }
    
    if (!agreed) {
      errors.agreed = 'Необходимо согласиться с условиями';
    }

    // Если есть ошибки, установим их в состояние
    if (Object.keys(errors).length > 0) {
      setFormData({ ...formData, errors });
    } else {
      try {
        // Отправка данных на сервер
        const response = await axios.post('/auth/register', {
          login: login,
          password,
          fio: fio,
          phone,
          email,
        });
        console.log('Успешная регистрация:', response.data);
        // Здесь вы можете выполнить действия после успешной регистрации, например, перенаправление на другую страницу
      } catch (error) {
        console.error('Ошибка регистрации:', error.response.data.message);
        // Обработка ошибок регистрации, например, отображение сообщения пользователю
      }
    }
  };
  return (
    <Container>
      <h2>Регистрация</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="login">
          <Form.Label>Логин</Form.Label>
          <Form.Control type="text" placeholder="Введите логин" onChange={handleChange} />
          {formData.errors.login && <Alert variant="danger">{formData.errors.login}</Alert>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="Введите пароль" onChange={handleChange} />
          {formData.errors.password && <Alert variant="danger">{formData.errors.password}</Alert>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="fio">
          <Form.Label>ФИО</Form.Label>
          <Form.Control type="text" placeholder="Введите ФИО" onChange={handleChange} />
          {formData.errors.fio && <Alert variant="danger">{formData.errors.fio}</Alert>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Телефон</Form.Label>
          <Form.Control type="tel" placeholder="Введите номер телефона" onChange={handleChange} />
          {formData.errors.phone && <Alert variant="danger">{formData.errors.phone}</Alert>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email адрес</Form.Label>
          <Form.Control type="email" placeholder="Введите email" onChange={handleChange} />
          {formData.errors.email && <Alert variant="danger">{formData.errors.email}</Alert>}
          <Form.Text className="text-muted">Мы никогда не передадим вашу электронную почту кому-либо еще.</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="terms">
          <Form.Check type="checkbox" label="Я согласен с условиями" onChange={() => setFormData({ ...formData, agreed: !formData.agreed })} />
          {formData.errors.agreed && <Alert variant="danger">{formData.errors.agreed}</Alert>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Зарегистрироваться
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;
