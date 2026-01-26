/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('notes').del()
    await knex('notes').insert([
        {
            id: 1,
            content: "HTML is easy",
            date: new Date("2022-11-10T17:30:31.098Z"),
            important: true,
            user_id: 1
          },
          {
            id: 2,
            content: "Browser can execute only Javascript",
            date: new Date("2022-11-10T18:39:34.091Z"),
            important: false,
            user_id: 1
          },
          {
            id: 3,
            content: "GET and POST are the most important methods of HTTP protocol",
            date: new Date("2022-11-10T19:20:14.298Z"),
            important: true,
            user_id: 2
          }
        ]);
  };