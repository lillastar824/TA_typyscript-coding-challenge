import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import moment from 'moment';
import restoreAttributes from '../utils/restoreAttributes';

class Users extends Model {
  public id!: number;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public password!: string;
  public verified!: boolean;
  public resetPasswordHash!: string;
  public resetPasswordTimeout!: string;
  public verificationHash!: string;
  public roleId!: number;
  public createdAt!: number;
  public updatedAt!: number;
  public deletedAt!: number;

  constructor(...args) {
    super(...args);
    restoreAttributes(new.target, this);
  }

  static associate(models) {
    Users.belongsTo(models.Roles, {
      foreignKey: 'roleId',
      as: 'Role',
    });
  }

  hashPassword() {
    this.password = bcrypt.hashSync(this.password);
  }
  setResetPassword() {
    const timeout = 15;
    const today = new Date();
    const twoweeks = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 14
    );
    const str = this.email + twoweeks.toISOString();
    this.resetPasswordHash = crypto.createHash('md5').update(str).digest('hex');
    this.resetPasswordTimeout = moment()
      .add(Number(timeout), 'minutes')
      .format();
  }

  unsetResetPassword() {
    this.resetPasswordHash = null;
    this.resetPasswordTimeout = null;
  }

  hasValidResetPassword() {
    return moment().isBefore(this.resetPasswordTimeout);
  }

  verifyPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

export const UsersFactory = (sequelize) => {
  Users.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      roleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      verified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verificationHash: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      resetPasswordHash: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      resetPasswordTimeout: {
        allowNull: true,
        type: DataTypes.DATE,
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
      hooks: {
        beforeUpdate(user: Users) {
          if (user.changed('password')) {
            user.hashPassword();
          }
        },
        beforeCreate(user: Users) {
          user.hashPassword();
          const today = new Date();
          const nextweek = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 7
          );
          const str = user.email + nextweek.toISOString();
          user.verificationHash = crypto
            .createHash('md5')
            .update(str)
            .digest('hex');
        },
      },
    }
  );

  return Users;
};
