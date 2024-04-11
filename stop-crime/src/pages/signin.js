import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function Signin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    error: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value, error: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === 'copp' && formData.password === 'password') {
      console.log('Вход выполнен успешно');
      window.location.href = '/Admin'; // Перенаправление на страницу Admin
    } else {
      setFormData({ ...formData, error: 'Некорректный логин или пароль' });
    }
  };

  return (
    <Container>
      <h2>Авторизация</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Логин</Form.Label>
          <Form.Control type="text" placeholder="Введите логин" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="Введите пароль" onChange={handleChange} />
        </Form.Group>
        {formData.error && <Alert variant="danger">{formData.error}</Alert>}
        <Button variant="primary" type="submit">
          Войти
        </Button>
      </Form>
    </Container>
  );
}

export default Signin;