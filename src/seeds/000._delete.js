exports.seed = async function(knex) {
  const classes = await knex('classes').del();
  const users = await knex('users').del();
  const attendances = await knex('attendances').del();
};
