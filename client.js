const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("./hello.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

const client = new proto.Hello(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.sayHello({ name: "ismet" }, (error, response) => {
  console.log(response);
});
