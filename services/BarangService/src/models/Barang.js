const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Barang = sequelize.define("Barang", {
  UUID: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  namaBarang: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  persediaanMinimum: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  satuan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  penyimpananUUID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  kategoriUUID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Barang;