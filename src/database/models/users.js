'use strict';
import bcrypt from 'bcrypt';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.bugs, {
        foreignKey: 'added_by'
      });
    }
  };
  users.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };
  users.init({
    names: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    user_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};