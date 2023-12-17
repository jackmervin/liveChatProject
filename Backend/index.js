//Library
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

//Instances
const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });

//Socaket
io.on("connect", (socket) => {
  console.log("User Connected");

  //Disconnect Socket
  socket.on("disconnect", () => {
    console.log("User Disconnect");
  });

  //Listen and emit(send) the message data for print
  socket.on("message", (data) => {
    io.emit("message", data);
  });

  //Listen and emit(send) the message Id for likeMessage
  socket.on("likeMessage", (index) => {
    io.emit("likeMessage", index);
  });

  //Listen and emit(send) the message Id for delete
  socket.on("deleteMessage", (index) => {
    io.emit("deleteMessage", index);
    console.log(index);
  });
});

//Checking End Point
app.get("/", (req, res) => {
  res.json("Api is working");
});

//Run Server
server.listen(3001, () => {
  console.log("server started on 3001");
});
