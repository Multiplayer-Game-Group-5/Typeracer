const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const http = require('http').createServer(app)
const io = require('socket.io')(http);

// { roomName: 'dfadsfsa', creator: 'testing', users: [] }
let rooms = []

app.get('/', (req, res) => {
  res.send('Hello World!')
})

io.on('connection', (socket) => {
  console.log('a user connected');

  // disesuaikan dengan emit kode (disini login) (data berisi username) dari vue client untuk mengirim username yang diinput di awal page
  socket.on('login', (data) => {
    socket.emit('getRooms', rooms)
    // mengirimkan data rooms yang tersedia
  })

  // mengambil data dari Rooms.vue yang isinya room name dan username creator roomnya
  socket.on('createRoom', (data) => {
    if(data) {
      console.log("masuk create room appjs")
      console.log(data)
      let room = {
        roomName: data.name,
        creator: data.creator,
        users: []
      }
      rooms.push(room)
      console.log(rooms)
      io.emit('updateRooms', rooms)
    } else {
      io.emit('updateRooms', rooms)
    }
  })

  // join ke suatu room
  socket.on('joinRoom', (data) => {
    console.log("masuk joinroom")
    console.log(data)
    socket.join(data.room, function () {
      console.log(socket.rooms)
      let roomIdx = rooms.findIndex((i) => i.roomName == data.room)
      let userIdx = rooms[roomIdx].users.findIndex((i) => i == data.username)
      if (rooms[roomIdx].users[userIdx] != data.username) {
        rooms[roomIdx].users.push(data.username)
        console.log(rooms)
        io.sockets.in(data.room).emit('roomDetail', rooms[roomIdx])
      } else {
        io.sockets.in(data.room).emit('roomDetail', rooms[roomIdx])
      }
    })
  })

  // mengirim semua orang yang ada diroom kecuali si creator room
  socket.on('startGame', (data) => {
    socket.broadcast.to(data).emit('startGame')
  })

});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});