"use strict";
exports.seed = function (knex) {
    return knex('classes').select().then(function (classes) {
        return knex('users').insert([
            { first_name: 'jonh', last_name: 'doe', email: 'jonh@gmail.com', role: 'student', password: 'password', class_id: classes[0].id }
        ]);
    });
};
