require("dotenv").config("../.env");

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const database = require("./src/config/database");
const barangController = require("./src/controllers/barang_controller");

const PROTO_PATH = __dirname + "/src/protos/BarangService.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const barangServiceProto =
  grpc.loadPackageDefinition(packageDefinition).barang_service;

const server = new grpc.Server();
server.addService(barangServiceProto.BarangService.service, {
  getBarang: barangController.getBarang,
  getBarangs: barangController.getBarangs,
  createBarang: barangController.createBarang,
  updateBarang: barangController.updateBarang,
  deleteBarang: barangController.deleteBarang,
});

const PORT = process.env.APP_PORT || 50051;
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`Barang service is running at http://localhost:${PORT}`);
  }
);