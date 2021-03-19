exports.seed = function(knex) {
  // Inserts seed entries
  return knex('classes').insert([
    { name: 'databases' }
  ]);
};
