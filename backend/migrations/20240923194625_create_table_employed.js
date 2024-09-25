/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const db = require('../database/db');
//create table
exports.up = function (knex) {
  return knex.schema.hasTable('employed').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('employed', (table) => {
        table.increments('id').unique();
        table.string('name').notNullable();
        table.string('last_name').notNullable();
        table.string('direction')
        table.string('dpi').unique().notNullable();
        table.string('number_IGGS').unique().notNullable();
        table.string('phone_number').notNullable();
        table.string('number_NIT').unique().notNullable();
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.hasTable('employed').then(function(exist){
    if(exist){
      return knex.schema.dropTable('employed');
    }
  })
};
