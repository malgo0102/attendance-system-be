exports.up = function(knex) {
  return knex.schema
    .createTable('classes', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
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
    })
    .createTable('schedule_event', table => {
      table.increments('id').primary();
      table.dateTime('start').notNullable();
      table.dateTime('end').notNullable();
      table
        .integer('course_id')
        .notNullable()
        .references('id')
        .inTable('courses')
        .onDelete('CASCADE');
    })
    .createTable('attendances', table => {
      table.increments('id').primary();
      table
        .string('code')
        .unique()
        .notNullable();
      table
        .integer('schedule_event_id')
        .unique()
        .notNullable()
        .references('id')
        .inTable('schedule_event')
        .onDelete('CASCADE');
      table.dateTime('end_time').notNullable();
      table.boolean('restrict_ip').notNullable();
      table.string('ip');
      table.boolean('is_closed').notNullable();
    })
    .createTable('attendance_logs', table => {
      table.increments('id').primary();
      table
        .integer('attendance_id')
        .notNullable()
        .references('id')
        .inTable('attendances')
        .onDelete('CASCADE');
      table.string('user_id').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('attendance_logs')
    .dropTableIfExists('attendances')
    .dropTableIfExists('schedule_event')
    .dropTableIfExists('courses')
    .dropTableIfExists('classes');
};
