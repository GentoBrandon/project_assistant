/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('roles').then(function (exist) {
    return knex.schema.createTable('roles', (table) => {
      table.increments('id').unique();
      table.string('name_rol');
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.hasTable('roles').then(function (exits) {
    if (exits) {
      return knex.schema.dropTable('roles');
    }
  });
};
