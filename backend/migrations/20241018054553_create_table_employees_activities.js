/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('employees_activities').then(function(exists) {
    if(!exists){
        return knex.schema.createTable('employees_activities', function(table) {
            table.increments('id').primary();
            table.date('date').notNullable();
            table.integer('employee_id').unsigned().notNullable();
            table.integer('lot_id').unsigned().notNullable();
            table.integer('activity_id').unsigned().notNullable();
            table.integer('sub_activity_id').unsigned().notNullable();
            table.foreign('employee_id').references('id').inTable('employed');
            table.foreign('lot_id').references('id').inTable('lots');
            table.foreign('activity_id').references('id').inTable('activities');
            table.foreign('sub_activity_id').references('id').inTable('sub_activities');
            
    })
  }
})

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.hasTable('employees_activities').then(function(exists) {
    if(exists){
        return knex.schema.dropTable('employees_activities');
  }
})
};
