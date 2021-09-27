'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    static associate(models) {
      models.Material.belongsToMany(models.LeaseObject, {
        through: 'LeaseObjectMaterials',
        as: 'leaseObjects',
        foreignKey: 'MaterialId',
        onDelete: 'cascade'
      });
    }
  };
  Material.init({
    name: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.STRING, allowNull: true }
  }, {
    sequelize,
    modelName: 'Material',
  });
  return Material;
};