exports.seed = function(knex) {
  return knex('users').select().then(users => {
    return knex('courses').insert([
      { name: 'Databases', teacher_id: users[0].id }
    ]);
  });
};
