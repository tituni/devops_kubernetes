// Update with your config settings.
require('dotenv').config()

module.exports = {

  development: {
    client: process.env.DB_TYPE,
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      socketPath: process.env.DB_SOCKETPATH
    }
  },
  staging: {
    client: process.env.DB_TYPE,
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: process.env.DB_TYPE,
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      socketPath: process.env.DB_SOCKETPATH
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
