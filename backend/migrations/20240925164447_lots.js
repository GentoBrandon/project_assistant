/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('lots').then(function(exits){
    if(!exits){
        return knex.schema.createTable('lots',(table)=>{
            table.increments('id').unique();
            table.string('name_lots');
            table.integer('area').unsigned();
        })
    }
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.hasTable('lots').then(function(exits){
            if(exits){
                return knex.schema.dropTable('lots');
            }
    })
};
