'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeaseObject extends Model {
    static associate(models) {
      models.LeaseObject.belongsToMany(models.Material, {
        through: 'LeaseObjectMaterials',
        as: 'materials',
        foreignKey: 'LeaseObjectId',
        onDelete: 'cascade'
      });
    }
  };
  LeaseObject.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LeaseObject',
  });
  return LeaseObject;
};