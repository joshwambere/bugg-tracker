'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bugs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  bugs.init({
    bug_title: DataTypes.STRING,
    bug_desc: DataTypes.STRING,
    bug_priority: DataTypes.STRING,
    bug_status: DataTypes.STRING,
    added_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bugs',
  });
  return bugs;
};