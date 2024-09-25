/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('activities').then(function(exits){
    if(!exits){
        return knex.schema.createTable('activities',(table)=>{
            table.increments('id').unique();
            table.string('name_acitivity');
        })
    }
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.hasTable('activities').then(function(exits){
    if(exits){
      return knex.schema.dropTable('activities');
    }
  })
};
