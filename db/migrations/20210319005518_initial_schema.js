exports.up = function(knex) {
  return knex.schema
      .createTable('classes', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
      })
      .createTable('users', (table) => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable();
        table.string('role').notNullable();
        table.string('password').notNullable();

        table.integer('class_id').unsigned();
        table.foreign('class_id').references('classes.id'); // foreign key
      })
      .createTable('courses', table => {
        table.increments('id').primary();
        table.string('name').notNullable();

        table.integer('teacher_id').unsigned();
        table.foreign('teacher_id').references('users.id'); // foreign key; if user is a teacher
      })
      .createTable('class_courses', table => {
        table.increments('id').primary();
        table.boolean('is_active').notNullable();

        table.integer('class_id').unsigned();
        table.foreign('class_id').references('classes.id') // foreign key

        table.integer('course_id').unsigned();
        table.foreign('course_id').references('courses.id') // foreign key
      })
      .createTable('schedule_events', table => {
        table.increments('id').primary();
        table.time('startAt').notNullable();
        table.time('endAt').notNullable();

        table.integer('classCourse_id').unsigned();
        table.foreign('classCourse_id').references('classCourses.id'); //foreign key
      })
      .createTable('attendances', (table) => {
        table.increments('id').primary();
        table.string('code').notNullable();
        table.float('coord_lat').notNullable();
        table.float('coord_lng').notNullable();
        table.time('closesAt').notNullable();

        table.integer('schedule_event_id').unsigned();
        table.foreign('schedule_event_id').references('scheduleEvents.id'); // foreign key
          
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id'); // foreign key
      })
};

exports.down = function(knex) {
  return knex.schema
       .raw('drop table if exists users cascade;')
       .raw('drop table if exists classes cascade;')
       .dropTableIfExists('attendances')
       .raw('drop table if exists class_courses cascade;')
       .dropTableIfExists('schedule_events')
       .raw('drop table if exists courses cascade;')
      
};
