import { Sequelize } from 'sequelize';

import { UsersFactory } from './Users';
import { RolesFactory } from './Roles';

const config = require('../config/config');

const env = process.env.NODE_ENV;
const configEnv = config[env];

const sequelize = new Sequelize(process.env.DATABASE_URL, configEnv);

const models = {
  Users: UsersFactory(sequelize),
  Roles: RolesFactory(sequelize),
};

Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

const db = {
  ...models,
  sequelize,
  Sequelize,
};

(async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default db;
