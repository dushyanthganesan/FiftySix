// Server setup
let express = require("express");
let app = express();
let server = app.listen(3000);
app.use(express.static("public"));

console.log("server running");

let socket = require("socket.io");
let io = socket(server);

io.sockets.on('connection', (socket) => {
  console.log("new connection");
});

