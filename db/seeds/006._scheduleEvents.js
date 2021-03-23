exports.seed = function(knex) {
  return knex('classCourses').select().then(classCourses => {
      return knex('scheduleEvents').insert([
       { startAt: '08:30:00', endAt: '14:30:00', classCourse_id: classCourses[0].id }
     ]);
   });
};
