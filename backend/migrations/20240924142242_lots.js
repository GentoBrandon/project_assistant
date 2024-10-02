/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * 
 */


exports.up = function(knex) {
    return knex.schema.hasTable('lots').then(function(exists){
        if(!exists){
            return knex.schema.createTable('lots', (table) => {
                table.increments('id').unique(),
                table.string('name_lots').notNullable()
            });
        }
    });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
