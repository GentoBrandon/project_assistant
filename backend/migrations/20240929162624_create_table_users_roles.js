/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('users_roles').then(function (exist) {
    if (!exist) {
      return knex.schema.createTable('users_roles', (table) => {
        table.increments('id');
        table.integer('user_id').unsigned();
        table.integer('role_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.foreign('role_id').references('roles.id');
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.hasTable('users_roles').then(function (exist) {
    if (exist) {
      return knex.schema.dropTable('users_roles');
    }
  });
};
