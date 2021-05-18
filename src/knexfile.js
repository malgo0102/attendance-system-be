require('dotenv').config({path: '../.env' });
const { knexSnakeCaseMappers } = require("objection");

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: '../db/migrations'
    },
    seeds: {
      directory: '../db/seeds'
    },
    ...knexSnakeCaseMappers()
  },

  test: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds'
    },
    ...knexSnakeCaseMappers()
  }

};
