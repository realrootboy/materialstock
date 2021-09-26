'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeaseObjectMaterials extends Model {
    static associate(models) { }
  };
  LeaseObjectMaterials.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    LeaseObjectId: {
      type: DataTypes.INTEGER,
      references: {model: 'LeaseObject', key: 'id'},
      unique: false,
      primaryKey: false,
    },
    MaterialId: {
      type: DataTypes.INTEGER,
      references: {model: 'Material', key: 'id'},
      unique: false,
      primaryKey: false,
    }
  }, {
    sequelize,
    modelName: 'LeaseObjectMaterials',
  });
  return LeaseObjectMaterials;
};