// Server setup
let express = require("express");
let app = express();
let server = app.listen(3000);
const Player = require('./Player.js');
const Host = require('./Host.js');

app.use(express.static("public"));
console.log("server running on port 3000");

let socket = require("socket.io");
let io = socket(server);
let host = new Host();
// Rooms:
//    "host":    all host instances
//    "players": all player instances 

// game vars
let playerCount = 0;
let players = new Map();

let gameStarted = false;
let colors = ["#976391","#6a994e","#40798c","#e09f3e","#32292f", "#d9594c"];

let stages = [];
stages[0] = 'name';
stages[1] = 'waiting for players';

let hostStages = [];
hostStages[0] = "wait for players";
hostStages[1] = "players joining";

// Sockets //
io.sockets.on('connection', node);
function node(socket) {
  console.log(`new connection [id=${socket.id}]`);
  // New Host
  socket.on("new host", (data) => {
    socket.join("host");
    console.log("A host has joined the host room");
    if (gameStarted) {
      socket.emit("update players");
    }
  })

  socket.on("restart", (data) => {
    console.log("restarting");
    io.sockets.emit("restart", "restart");
    restart();
  });

  // New Player //
  socket.on("new player", (name) => {
    if (!gameStarted && playerCount < 6) {
      playerCount++;
      player = new Player(name);
      player.number = playerCount;
      player.color = colors[player.number - 1];
      console.log(`${player.name} has joined`);
      players.set(player.number, player);
      socket.join("players");
      socket.emit("update player", player);
      socket.emit("stage", stages[1]);
      host.newPlayer(player.name, player.number);
      io.to("host").emit("update players", host);
      io.to("host").emit("host stage", hostStages[1]);
    }
  });

}

function restart() {
  host = new Host();
  playerCount = 0;
  players = new Map();
  gameStarted = false;
}
