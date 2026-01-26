const testPassword = "salasana"

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hashedpassword = bcrypt.hashSync(testPassword, salt);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, username: 'testuser1',password: hashedpassword, email: "test1@test.fi"},
    {id: 2, username: 'testuser2',password: hashedpassword, email: "test2@test.fi"},
    {id: 3, username: 'testuser3',password: hashedpassword, email: "test3@test.fi"}
  ]);
};
