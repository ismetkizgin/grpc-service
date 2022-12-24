var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync("./hello.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function sayHello(call, callback) {
  console.log(`request parameters: ${call.request.name}`);
  callback(null, { message: `Hello ${call.request.name}` });
}

function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Hello.service, { sayHello: sayHello });
  server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
  server.start();
  console.log("grpc service is live : " + "0.0.0.0:50051");
}

main();
