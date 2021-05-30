exports.seed = function(knex) {
  return knex('attendances').insert([
    {
      code: 'KMGCL8',
      schedule_event_id: 2,
      end_time: '2021-05-30 12:51:00.268000',
      restrict_ip: false,
      ip: '',
      is_closed: false,
    },
    {
      code: '592KS7',
      schedule_event_id: 1,
      end_time: '2021-05-30 16:05:00.215000',
      restrict_ip: true,
      ip: '194.255.34.64',
      is_closed: false,
    },
  ]);
};
