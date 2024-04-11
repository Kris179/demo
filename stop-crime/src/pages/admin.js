import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

function Admin() {
  // Предположим, что заявления доступны в этой переменной
  const statements = [
    { fullName: 'Иванов Иван Иванович', carNumber: 'A123BC', description: 'Превышение скорости', status: 'Рассматривается' },
    { fullName: 'Петров Петр Петрович', carNumber: 'B456DE', description: 'Проезд на красный свет', status: 'Отклонено' },
    { fullName: 'Сидоров Сидор Сидорович', carNumber: 'C789FG', description: 'Парковка на тротуаре', status: 'В ожидании' }
  ];

  const handleChangeStatus = (index) => {
    // Здесь можно реализовать логику изменения статуса заявления
    console.log(`Изменение статуса заявления с индексом ${index}`);
  };

  return (
    <Container>
      <h2>Панель администратора</h2>
      
      {/* Таблица со всеми заявлениями */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Гос. номер автомобиля</th>
            <th>Описание нарушения</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {statements.map((statement, index) => (
            <tr key={index}>
              <td>{statement.fullName}</td>
              <td>{statement.carNumber}</td>
              <td>{statement.description}</td>
              <td>{statement.status}</td>
              <td>
                <Button onClick={() => handleChangeStatus(index)}>Изменить статус</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Admin;