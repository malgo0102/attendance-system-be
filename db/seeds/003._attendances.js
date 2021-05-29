exports.seed = function(knex) {
  return knex('attendances').insert([
    {
      code: 'xxxxxxx',
      coord_lat: '51.227339 ',
      coord_lng: '17.564932',
      closesAt: '08:30:00',
      user_id: 1,
    },
  ]);
};
