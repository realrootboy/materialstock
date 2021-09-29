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
      models.Material.belongsToMany(models.Lease, {
        through: 'LeaseMaterials',
        as: 'leases',
        foreignKey: 'MaterialId',
        onDelete: 'cascade',
      });
    }
  };
  Material.init({
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Material',
  });
  return Material;
};