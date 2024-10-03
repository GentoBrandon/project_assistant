/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('sub_activities').then(function (exist) {
    if (!exist) {
      return knex.schema.createTable('sub_activities', (table) => {
        table.increments('id').unique();
        table.string('name_sub_activity');
        table.string('description');
        table.integer('id_actividad').unsigned();
        table.foreign('id_actividad', 'activities.id');
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.hasTable('sub_activities').then(function (exits) {
    if (exits) {
      return knex.schema.dropTable('sub_activities');
    }
  });
};
