exports.seed = async function(knex) {
  const classes = await knex('classes').del();
  const attendances = await knex('attendances').del();
  const courses = await knex('courses').del();
};
