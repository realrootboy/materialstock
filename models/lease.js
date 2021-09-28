'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lease extends Model {
    static associate(models) {
      models.Lease.belongsToMany(models.Employee, {
        through: 'LeaseEmployees',
        as: 'employees',
        foreignKey: 'LeaseId',
        onDelete: 'cascade'
      });
      models.Lease.belongsTo(models.Costumer);
    }
  };
  Lease.init({
    location: DataTypes.STRING,
    mountDay: DataTypes.DATE,
    umountDay: DataTypes.DATE,
    leaseTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Lease',
  });
  return Lease;
};