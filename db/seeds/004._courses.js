exports.seed = function(knex) {
  // Inserts seed entries
  return knex('courses').insert([
    { name: 'Databases', user_id: '1' },
    { name: 'Large Systems Development', user_id: '1' },
    { name: 'Test', user_id: '1' },
  ]);
};