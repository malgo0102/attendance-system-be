exports.up = function(knex) {
  return knex.schema
    .createTable('classes', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
    })
    .createTable('attendances', table => {
      table.increments('id').primary();
      table.string('code').notNullable();
      table.integer('coord_lat').notNullable();
      table.integer('coord_lng').notNullable();
      table.time('closesAt').notNullable();
      table.integer('user_id');
    })
    .createTable('courses', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('user_id');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('classes')
    .dropTableIfExists('courses');
};
