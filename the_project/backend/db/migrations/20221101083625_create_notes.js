/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('users', t => {
        t.increments('id').primary()
        t.string('username').notNullable().unique()
        t.string('password').notNullable()
        t.string('email').notNullable().unique()
        t.timestamps(false, true)
    })
    .createTable('notes', t => {
        t.increments('id').primary()
        t.string('content').notNullable()
        t.datetime('date').notNullable()
        t.boolean('important').notNullable()
        t.integer('user_id').unsigned().references('id').inTable('users').notNull()
        .onDelete('cascade')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('notes')
    .dropTableIfExists('users')
};
