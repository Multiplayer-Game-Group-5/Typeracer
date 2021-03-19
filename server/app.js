const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const http = require('http').createServer(app)
const io = require('socket.io')(http)
let users = []
let words = require('./dict')

let obj = {}
for (let i = 0; i < words.length; i++) {
  obj[i] = 0
}

function randomWords (arr) {
  let number = Math.floor((Math.random()) * words.length)
  if (obj[number] === 0) {
    obj[number] += 1
    return arr[number]
  } else {
    obj[number] += 1
    return randomWords (arr)
  }
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