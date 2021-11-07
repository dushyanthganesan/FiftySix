// Server setup
let express = require("express");
let app = express();
let server = app.listen(3000);
const Player = require('./Player.js');

app.use(express.static("public"));
console.log("server running on port 3000");

let socket = require("socket.io");
let io = socket(server);

// game vars
let playerCount = 0;
let players = new Map();
let gameStarted = false;
colors = ["#6a994e","#40798c","#e09f3e","#976391","#f24333"];

let stages = [];
stages[0] = 'name';
stages[1] = 'waitingForHost';

// Sockets //
io.sockets.on('connection', node);
function node(socket) {
  console.log(`new connection [id=${socket.id}]`);

  // New Player //
  socket.on("new player", (name) => {
    if (!gameStarted) {
      playerCount++;
      player = new Player(name);
      player.number = playerCount;
      player.color = colors[player.number];
      console.log(player);
      players.set(player.name, player);
      socket.emit("update player", player);
      socket.emit("stage", stages[1]);
    }
  });

}