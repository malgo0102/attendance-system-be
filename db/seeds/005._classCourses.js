exports.seed = function(knex) {
  return knex('classes').select().then(classes => {
    return knex('courses').select().then(courses => {
      return knex('classCourses').insert([
       { is_active: true, class_id: classes[0].id, course_id: courses[0].id }
     ]);
   });
  });
};
