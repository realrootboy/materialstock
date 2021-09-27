'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Lease.init({
    location: DataTypes.STRING,
    mountDay: DataTypes.DATE,
    umountday: DataTypes.DATE,
    leaseTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Lease',
  });
  return Lease;
};