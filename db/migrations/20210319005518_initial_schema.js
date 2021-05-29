exports.up = function(knex) {
  return knex.schema
    .createTable('classes', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
    })
    .createTable('attendances', table => {
      table.increments('id').primary();
      table.string('code').notNullable();
      table.decimal('coord_lat').notNullable();
      table.decimal('coord_lng').notNullable();
      table.time('closesAt').notNullable();
      table.integer('user_id');
    })
    .createTable('courses', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('teacher_id').notNullable();
      table
        .integer('class_id')
        .notNullable()
        .references('id')
        .inTable('classes')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('attendances')
    .dropTableIfExists('courses')
    .dropTableIfExists('classes');
};
