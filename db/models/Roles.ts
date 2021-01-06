import { Model, DataTypes } from 'sequelize';
import restoreAttributes from '../utils/restoreAttributes';

class Roles extends Model {
  public id!: number;
  public name!: string;
  public createdAt!: number;
  public updatedAt!: number;
  public deletedAt!: number;

  constructor(...args) {
    super(...args);
    restoreAttributes(new.target, this);
  }

  static associate(models) {}
}

export const RolesFactory = (sequelize) => {
  Roles.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'users',
      sequelize,
      paranoid: true,
    }
  );

  return Roles;
};
