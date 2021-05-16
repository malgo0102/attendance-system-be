"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
require('dotenv').config({ path: '../.env' });
var knexSnakeCaseMappers = require("objection").knexSnakeCaseMappers;
module.exports = {
    development: __assign({ client: 'pg', connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        }, pool: {
            min: 2,
            max: 10
        }, migrations: {
            directory: '../db/migrations'
        }, seeds: {
            directory: '../db/seeds'
        } }, knexSnakeCaseMappers()),
    test: __assign({ client: 'pg', connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        }, pool: {
            min: 2,
            max: 10
        }, migrations: {
            directory: './db/migrations',
        }, seeds: {
            directory: './db/seeds'
        } }, knexSnakeCaseMappers())
};
