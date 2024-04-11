import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function New_paper() {
  const [statements, setStatements] = useState([]);
  const [formData, setFormData] = useState({
    carNumber: '',
    description: ''
  });
  const [errors, setErrors] = useState({
    carNumber: '',
    description: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: value ? '' : 'Поле обязательно для заполнения' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка на заполнение всех обязательных полей
    if (!formData.carNumber.trim()) {
      setErrors({ ...errors, carNumber: 'Поле обязательно для заполнения' });
      return;
    }
    if (!formData.description.trim()) {
      setErrors({ ...errors, description: 'Поле обязательно для заполнения' });
      return;
    }

    const newStatement = {
      carNumber: formData.carNumber,
      description: formData.description,
      status: 'Новое' // При создании нового заявления устанавливаем статус "Новое"
    };
    setStatements([...statements, newStatement]);
    setFormData({ carNumber: '', description: '' });
    setErrors({ carNumber: '', description: '' });
  };

  return (
    <Container>
      <h2>Заявления</h2>
      
      {/* Форма для оставления нового заявления */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="carNumber">
          <Form.Label>
            Государственный регистрационный номер автомобиля<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите номер автомобиля"
            value={formData.carNumber}
            onChange={handleChange}
            isInvalid={!!errors.carNumber}
          />
          <Form.Control.Feedback type="invalid">
            {errors.carNumber}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>
            Описание нарушения<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Введите описание"
            value={formData.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Отправить заявление
        </Button>
        {/* Кнопка для перехода на страницу Papers */}
        {statements.length > 0 && (
          <Link to="/papers" className="btn btn-secondary ms-2">
            Перейти к заявлениям
          </Link>
        )}
      </Form>
    </Container>
  );
}

export default New_paper;