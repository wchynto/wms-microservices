const grpc = require("@grpc/grpc-js");
const { v4: uuidv4 } = require("uuid");
const Penyimpanan = require("../models/Penyimpanan");

const getPenyimpanan = async (call, callback) => {
  try {
    const Penyimpanan = await Penyimpanan.findByPk(call.request.uuid);
    if (Penyimpanan) {
      callback(null, Penyimpanan);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        message: "Penyimpanan not found",
      });
    }
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
};

const getPenyimpanans = async (call, callback) => {
  try {
    const Penyimpanan = await Penyimpanan.findAll();
    callback(null, { Penyimpanan: Penyimpanan });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
};

const createPenyimpanan = async (call, callback) => {
  try {
    const Penyimpanan = await Penyimpanan.create({
      uuid: uuidv4(),
      namaPenyimpanan: call.request.namaPenyimpanan,
      isAvailable: true,
    })
    callback(null, Penyimpanan);
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
};

const updatePenyimpanan = async (call, callback) => {
  try {
    const Penyimpanan = await Penyimpanan.findByPk(call.request.uuid);
    if (Penyimpanan) {
      await Penyimpanan.update({
        namaPenyimpanan: call.request.namaPenyimpanan,
        isAvailable: call.request.isAvailable,
      });
      callback(null, Penyimpanan);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        message: "Penyimpanan not found",
      });
    }
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
};

const deletePenyimpanan = async (call, callback) => {
  try {
    const Penyimpanan = await Penyimpanan.findByPk(call.request.uuid);
    if (Penyimpanan) {
      await Penyimpanan.destroy();
      callback(null, {});
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        message: "Penyimpanan not found",
      });
    }
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
};

const updateStatusPenyimpanan = async (call, callback) => {
  try {
    const Penyimpanan = await Penyimpanan.findByPk(call.request.uuid);
    if (Penyimpanan) {
      await Penyimpanan.update({
        isAvailable: call.request.isAvailable,
      });
      callback(null, Penyimpanan);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        message: "Penyimpanan not found",
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
  getPenyimpanan,
  getPenyimpanans,
  createPenyimpanan,
  updatePenyimpanan,
  deletePenyimpanan,
  updateStatusPenyimpanan,
};