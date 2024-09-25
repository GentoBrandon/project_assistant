/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('types_returns').then(function(exits){
    if(!exits){
        return knex.schema.createTable('types_returns',(table)=>{
            table.increments('id').unique();
            table.string('name_performance');
            table.string('description');
        })
    }
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.hasTable('types_returns').then(function(exits){
        if(exits){
          return knex.schema.dropTable('types_returns');
        }
      })
};
