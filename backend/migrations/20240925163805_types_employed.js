/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('types_employed').then(function(exist){
    if(!exist){
        return knex.schema.createTable('types_employed',(table)=>{
            table.increments('id').unique();
            table.string('type_employed');
            table.integer('id_employed');
            table.foreign('id_employed').references('employed.id');
        })
    }
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.hasTable('types_employed').then(function(exits){
        if(exits){
            return knex.schema.dropTable('types_employed');
        }
    })
};
