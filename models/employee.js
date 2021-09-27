'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      models.Employee.belongsToMany(models.Lease, {
        through: 'LeaseEmployees',
        as: 'leases',
        foreignKey: 'EmployeeId',
        onDelete: 'cascade'
      });
    }
  };
  Employee.init({
    name: DataTypes.STRING,
    contact: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};