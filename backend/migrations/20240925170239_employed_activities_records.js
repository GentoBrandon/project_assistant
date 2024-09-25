/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('employed_activities_records').then(function(exits){
    if(!exits){
        return knex.schema.createTable('employed_activities_records',(table)=>{
            table.increments('id').unique();
            table.date('date');
            table.integer('lot_id').notNullable();
            table.integer('activity_id').notNullable();
            table.integer('sub_activity_id').notNullable();
            table.integer('type_return_id').notNullable();
            table.string('observation').notNullable();
            table.foreign('lot_id').references('lots.id');
            table.foreign('activity_id').references('activities.id');
            table.foreign('sub_activity_id').references('sub_activities.id');
            table.foreign('type_return_id').references('types_returns.id');
        })
    }
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.hasTable('employed_activities_records').then(function(exits){
        if(exits){
          return knex.schema.dropTable('employed_activities_records');
        }
      })
};
