/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('users').then(function (exits) {
    if (!exits) {
      return knex.schema.createTable('users', (table) => {
        table.increments('id').unique(),
          table.string('user_name'),
          table.string('password');
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.hasTable('users').then(function (exits) {
    if (exits) {
      return knex.schema.dropTable('users');
    }
  });
};
