const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '..', '.env') });

module.exports = {
  local: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: false,
    define: {
      syncOnAssociation: false,
    },
    dialectModule: require('pg'),
    syncOnAssociation: false,
    sync: { force: false },
    seederStorage: 'sequelize',
  },
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: false,
    define: {
      syncOnAssociation: false,
    },
    dialectModule: require('pg'),
    syncOnAssociation: false,
    sync: { force: false },
    seederStorage: 'sequelize',
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB + '_test',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: false,
    define: {
      syncOnAssociation: false,
    },
    dialectModule: require('pg'),
    syncOnAssociation: false,
    sync: { force: false },
    seederStorage: 'sequelize',
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: false,
    define: {
      syncOnAssociation: false,
    },
    dialectModule: require('pg'),
    syncOnAssociation: false,
    sync: { force: false },
    seederStorage: 'sequelize',
  },
};
