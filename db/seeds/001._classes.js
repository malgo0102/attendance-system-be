exports.seed = function(knex) {
  // Inserts seed entries
  return knex('classes').insert([
    { name: 'SD21W1' },
    { name: 'SD21W2' },
  ]);
};
