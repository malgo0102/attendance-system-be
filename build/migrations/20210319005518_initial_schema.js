"use strict";
exports.up = function (knex) {
    return knex.schema
        .createTable('classes', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
    })
        .createTable('users', function (table) {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable();
        table.string('role').notNullable();
        table.string('password').notNullable();
        table.integer('class_id').unsigned();
        table.foreign('class_id').references('classes.id'); // foreign key
    })
        .createTable('attendances', function (table) {
        table.increments('id').primary();
        table.string('code').notNullable();
        // scheduleEventId
        table.float('coord_lat').notNullable();
        table.float('coord_lng').notNullable();
        table.time('closesAt').notNullable();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id'); // foreign key
    });
};
exports.down = function (knex) {
    return knex.schema
        .raw('drop table if exists users cascade;')
        .dropTableIfExists('classes')
        .dropTableIfExists('attendances');
};
