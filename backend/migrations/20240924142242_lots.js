/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 *
 */

exports.up = function (knex) {
  return knex.schema.hasTable('lotes').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('lotes', (table) => {
        table.increments('id').unique(),
          table.string('name_lotes').notNullable();
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .hasTable('lotes') // Verifica si la tabla existe
    .then(function (exists) {
      if (exists) {
        // Si la tabla existe
        return knex.schema.dropTable('lotes'); // Elimina la tabla
      }
    });
};
