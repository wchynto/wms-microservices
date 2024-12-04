const grpc = require("@grpc/grpc-js");
const { v4: uuidv4 } = require("uuid");
const Kategori = require("../models/Barang");

const getKategori = async (call, callback) => {
  try {
    const kategori = await Kategori.findByPk(call.request.uuid);
    if (kategori) {
      callback(null, kategori);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        message: "Kategori not found",
      });
    }
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
};

const getKategoris = async (call, callback) => {
  try {
    const kategori = await Kategori.findAll();
    callback(null, { kategori: kategori });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
};

const createKategori = async (call, callback) => {
  try {
    const kategori = await Kategori.create({
      uuid: uuidv4(),
      namaKategori: call.request.namaKategori,
    })
    callback(null, kategori);
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
};

const updateKategori = async (call, callback) => {
  try {
    const kategori = await Kategori.findByPk(call.request.uuid);
    if (kategori) {
      await kategori.update({
        namaKategori: call.request.namaKategori,
      });
      callback(null, kategori);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        message: "Kategori not found",
      });
    }
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
};

const deleteKategori = async (call, callback) => {
  try {
    const kategori = await Kategori.findByPk(call.request.uuid);
    if (kategori) {
      await kategori.destroy();
      callback(null, {});
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        message: "Kategori not found",
      });
    }
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
};

module.exports = {
  getKategori,
  getKategoris,
  createKategori,
  updateKategori,
  deleteKategori,
};