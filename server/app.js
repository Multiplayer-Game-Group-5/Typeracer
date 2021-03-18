const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const http = require('http').createServer(app)
const io = require('socket.io')(http);
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
  })

});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});