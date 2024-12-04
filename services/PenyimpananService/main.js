require("dotenv").config("../.env");

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const database = require("./src/config/database");
const penyimpananController = require("./src/controllers/penyimpanan_controller");

const PROTO_PATH = __dirname + "/src/protos/PenyimpananService.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const penyimpananServiceProto =
  grpc.loadPackageDefinition(packageDefinition).penyimpanan_service;

const server = new grpc.Server();
server.addService(penyimpananServiceProto.PenyimpananService.service, {
  getPenyimpanan: penyimpananController.getPenyimpanan,
  getPenyimpanans: penyimpananController.getPenyimpanans,
  createPenyimpanan: penyimpananController.createPenyimpanan,
  updatePenyimpanan: penyimpananController.updatePenyimpanan,
  deletePenyimpanan: penyimpananController.deletePenyimpanan,
  updateStatusPenyimpanan: penyimpananController.updateStatusPenyimpanan,
});

const PORT = process.env.APP_PORT || 50051;
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`User service is running at http://localhost:${PORT}`);
  }
);