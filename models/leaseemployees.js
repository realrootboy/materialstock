'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeaseEmployees extends Model {
    static associate(models) { }
  };
  LeaseEmployees.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    LeaseId: {
      type: DataTypes.INTEGER,
      references: {model: 'Lease', key: 'id'},
      unique: false,
      primaryKey: false,
    },
    EmployeeId: {
      type: DataTypes.INTEGER,
      references: {model: 'Employee', key: 'id'},
      unique: false,
      primaryKey: false,
    },
    action: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'LeaseEmployees',
  });
  return LeaseEmployees;
};