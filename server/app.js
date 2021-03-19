const express = require('express');
const { emit } = require('process');
const app = express()
const port = process.env.PORT || 3000
const http = require('http').createServer(app)
const io = require('socket.io')(http)
let users = []
let words = [
  'makan', 'coding', 'belajar', 'masak', 'kuku kaki', 'kakek', 'astaga', 'tidur', 'seratus ribu'
]

function randomWords (arr) {
  return arr[Math.floor((Math.random()) * words.length)]
}

// { roomName: 'dfadsfsa', creator: 'testing', users: [] }
let rooms = []
let users = []

let words = [
  'makan', 'coding', 'belajar', 'masak', 'kuku kaki', 'kakek', 'astaga', 'tidur', 'seratus ribu'
]

function randomWords (arr) {
  return arr[Math.floor((Math.random()) * words.length)]
}

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
      console.log(data, 'DI CREATE ROOM')
      let room = {
        roomName: data.name,
        creator: data.creator,
        users: []
      }
      rooms.push(room)
      console.log(rooms, 'DI CREATE ROOM 2')
      io.emit('updateRooms', rooms)
    } else {
      io.emit('updateRooms', rooms)
    }
  })

  // join ke suatu room
  socket.on('joinRoom', (data) => {
    console.log("masuk joinroom")
    console.log(data, 'SEBELUM JOIN ROOM')
    socket.join(data.room, function () {
      console.log(socket.rooms)
      let roomIdx = rooms.findIndex((i) => i.roomName == data.room)
      let userIdx = rooms[roomIdx].users.findIndex((i) => i == data.username)
      if (rooms[roomIdx].users[userIdx] != data.username) {
        rooms[roomIdx].users.push({
          username: data.username,
          points: 0
        })

        // console.log(rooms, 'SEE');
        // users = rooms[roomIdx].users
        // console.log(users)
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

  // START GAME
  socket.on('fetchUser', (data) => {
    let roomIdx = rooms.findIndex((i) => i.roomName == data.roomName)
    console.log(data, 'PARAMS');
    if (rooms[roomIdx]) {
      io.sockets.in(data.roomName).emit('sendAllUser', rooms[roomIdx].users);
    }
  })

  socket.on('changeWord', (data) => {
    io.sockets.in(data.roomName).emit('nextWord', randomWords(words));
  })

  socket.on("addPoint", (data) => {
    let roomIdx = rooms.findIndex((i) => i.roomName == data.roomName.roomName)
    console.log(data);
    rooms[roomIdx].users.forEach(user => {
      if (user.username === data.username) {
        if (user.points === 90) {
          io.sockets.in(data.roomName.roomName).emit("getWinner", user);
          users = [];
          rooms.splice(roomIdx, 1);
        } else {
          user.points = user.points + 10
          io.sockets.in(data.roomName.roomName).emit("updatedScore", users);
        }
      }
    })
  })

 
  socket.on('startGame', (data) => {
    io.sockets.in(data.roomName).emit('startGameAllUsers');\
  })

});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});