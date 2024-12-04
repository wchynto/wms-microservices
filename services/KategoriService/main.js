require("dotenv").config("../.env");

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const database = require("./src/config/database");
const kategoriController = require("./src/controllers/kategori_controller");

const PROTO_PATH = __dirname + "/src/protos/KategoriService.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const kategoriServiceProto =
  grpc.loadPackageDefinition(packageDefinition).kategori_service;

const server = new grpc.Server();
server.addService(kategoriServiceProto.KategoriService.service, {
  getKategori: kategoriController.getKategori,
  getKategoris: kategoriController.getKategoris,
  createKategori: kategoriController.createKategori,
  updateKategori: kategoriController.updateKategori,
  deleteKategori: kategoriController.deleteKategori,
});

const PORT = process.env.APP_PORT || 50051;
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`Kategori service is running at http://localhost:${PORT}`);
  }
);