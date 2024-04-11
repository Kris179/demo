const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    user: 'postgres',
    host: 'localhost',
    database: 'stop_crime',
    password: '1234',
    port: 5432,
  },
});

module.exports = db;