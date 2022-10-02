// Server setup
let express = require("express");
let app = express();
let server = app.listen(3000);
const Player = require("./Player.js");
const Host = require("./Host.js");

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
let players_vect = [];

let gameStarted = false;
let colors = ["#976391", "#6a994e", "#40798c", "#e09f3e", "#32292f", "#d9594c"];

let playerStages = [];
playerStages[0] = "name";
playerStages[1] = "waiting for players";

let currentHostStage;
let hostStages = [];
hostStages[0] = "wait for players";
hostStages[1] = "players joining";

// Sockets //
io.sockets.on("connection", node);
function node(socket) {
  console.log(`new connection [id=${socket.id}]`);
  // NEW HOST //
  socket.on("new host", (data) => {
    socket.join("host");
    console.log("A host has joined the host room");
    if (playerCount != 0) {
      socket.emit("update players", host);
      io.to("host").emit("host stage", currentHostStage);
    }
  });

  socket.on("restart", (data) => {
    console.log("restarting");
    io.sockets.emit("restart", "restart");
    restart();
  });

  // NEW PLAYER //
  socket.on("new player", (name) => {
    // Check if name has been repeated
    validName = true;
    players_vect.forEach((p) => {
      console.log(p);
      if (p == name && !gameStarted) {
        console.log("Identical name for new player not allowed.");
        socket.emit("restart", "restart");
        validName = false;
      }
    });

    // Main new player
    if (!gameStarted && playerCount < 6 && validName) {
      playerCount++;
      // initialize player object
      player = new Player(name);
      player.number = playerCount;
      player.color = colors[player.number - 1];
      console.log(`${player.name} has joined`);
      players.set(player.number, player);
      players_vect.push(player.name);
      // join rooms: players, name specific
      socket.join("players");
      socket.join(player.name);
      socket.emit("update player", player);
      socket.emit("player stage", playerStages[1]);
      host.newPlayer(player.name, player.number);
      io.to("host").emit("update players", host);
      currentHostStage = hostStages[1];
      io.to("host").emit("host stage", currentHostStage);
    }
  });
}

function restart() {
  host = new Host();
  playerCount = 0;
  players = new Map();
  players_vect = [];
  gameStarted = false;
  currentHostStage = hostStages[0];
}
