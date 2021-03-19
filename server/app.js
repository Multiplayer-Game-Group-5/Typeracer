const express = require('express')
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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('fetchUser', () => {
    socket.emit('sendAllUser', users);
  })

  socket.on('login', (data) => {
    users.push(data);
    console.log(users);
    io.emit('getUsers', users)
  })

  socket.on('changeWord', () => {
    io.emit('nextWord', randomWords(words));
  })

  socket.on("addPoint", (data) => {
    users.forEach(user => {
      if (user.username === data) {
        if (user.points === 90) {
          io.emit("getWinner", user);
          users = []
        } else {
          user.points = user.points + 10
          io.emit("updatedScore", users);
        }
      }
    })
  })

  socket.on('startGame', () => {
    io.emit('startGameAllUsers');
  })

});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});