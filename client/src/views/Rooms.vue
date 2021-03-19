<template>
  <div class="container">
    <div class="container">
      <h1> Create a Room </h1>
      <form @submit.prevent="createRoom">
        <input
          v-model="roomName"
          type="text"
          placeholder="create a room"
        />
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div class="container" v-if="rooms.length != 0">
        <div class="card width-100" v-for="(room, idx) in rooms" :key="idx">
          <p>{{ room.roomName }}</p>
          <button class="btn btn-info" @click.prevent="joinRoom(room.roomName)">
          JoinRoom
          </button>
        </div>
      </div>
      <div class="container" v-else >
        <p>No Room available, please create a room</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      rooms: [],
      roomName: ''
    }
  },
  sockets: {
    updateRooms (data) {
      console.log(data)
      this.rooms = data
    },
    getRooms (data) {
      this.rooms = data
      console.log(this.rooms, 'INI GET ROOMS')
    }
  },
  methods: {
    createRoom () {
      // diatas ini didelete aja
      console.log(this.rooms)
      const payload = {
        // conditional, sesuaikan variable apa yang ada di localstorage
        name: this.roomName,
        creator: localStorage.getItem('username') || 'testing'
      }
      if (payload.name && payload.creator) {
        this.$socket.emit('createRoom', payload)
        console.log(payload)
        this.roomName = ''
      } else {
        this.$socket.emit('createRoom')
      }
    },
    checkConnect () {
      console.log('masuk check')
    },
    joinRoom (roomName) {
      const payload = {
        room: roomName,
        username: localStorage.getItem('username') || 'testing'
      }
      this.$socket.emit('joinRoom', payload)
      this.$router.push(`/lobby/${roomName}`)
    }
  },
  created () {
    this.checkConnect()
    this.createRoom()
    this.$socket.on('updateRooms', data => {
      this.rooms = data
    })
    this.$socket.emit('login', this.username)
  }
}
</script>

<style>

</style>
