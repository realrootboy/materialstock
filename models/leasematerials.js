'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeaseMaterials extends Model {
    static associate(models) { }
  };
  LeaseMaterials.init({
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
    MaterialId: {
      type: DataTypes.INTEGER,
      references: {model: 'Material', key: 'id'},
      unique: false,
      primaryKey: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'LeaseMaterials',
  });
  return LeaseMaterials;
};