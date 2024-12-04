const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Kategori = sequelize.define("Kategori", {
  UUID: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  namaKategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Kategori;