/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('state_employed').then(function(exist){
    if(!exist){
        return knex.schema.createTable('state_employed',(table)=>{
            table.increments('id').unique();
            table.string('state');
            table.integer('id_employed').unsigned();
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
  return knex.schema.hasTable('state_employed').then(function(exist){
    if(exist){
        return knex.schema.dropTable('state_employed');
    }
  })
};
