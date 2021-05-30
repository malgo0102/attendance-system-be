exports.seed = function(knex) {
  // Inserts seed entries
  return knex('courses').insert([
    {
      name: 'Databases',
      teacher_id: 'auth0|60aba90b096bdb0068f79113',
      class_id: '1',
    },
    {
      name: 'Large Systems Development',
      teacher_id: 'auth0|60aba90b096bdb0068f79113',
      class_id: '1',
    },
    {
      name: 'Test',
      teacher_id: 'auth0|60aba90b096bdb0068f79113',
      class_id: '1',
    },
  ]);
};
