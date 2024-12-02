require("dotenv").config("../.env");

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const database = require("./src/config/database");
const userController = require("./src/controllers/user_controller");

const PROTO_PATH = __dirname + "/src/protos/UserService.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userServiceProto =
  grpc.loadPackageDefinition(packageDefinition).user_service;

const server = new grpc.Server();
server.addService(userServiceProto.UserService.service, {
  authenticateUser: userController.authenticateUser,
  getUser: userController.getUser,
  getUserByEmail: userController.getUserByEmail,
  getUsers: userController.getUsers,
  createUser: userController.createUser,
  updateUser: userController.updateUser,
  deleteUser: userController.deleteUser,
});

const PORT = process.env.APP_PORT || 50051;
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`User service is running at http://localhost:${PORT}`);
  }
);