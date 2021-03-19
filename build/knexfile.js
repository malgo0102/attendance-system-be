"use strict";
require('dotenv').config();
module.exports = {
    development: {
        client: 'pg',
        connection: {
            database: 'attendance_system',
            user: 'postgres',
            password: 'postgres'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    },
    test: {
        client: 'pg',
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './migrations',
        },
        seeds: {
            directory: './seeds'
        }
    }
};
