exports.seed = async function(knex) {
  const classes = await knex('classes').del();
  const users = await knex('users').del();
  const attendances = await knex('attendances').del();
  const classeCourses = await knex('class_courses').del();
  const scheduleEvents = await knex('schedule_events').del();
  const courses = await knex('courses').del();
};
