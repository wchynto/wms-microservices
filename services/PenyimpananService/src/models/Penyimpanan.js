const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Penyimpanan = sequelize.define("Penyimpanan", {
  UUID: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  namaPanyimpanan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
});

module.exports = Penyimpanan;