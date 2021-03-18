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
        <div class="card" v-for="(room, idx) in rooms" :key="idx">
          <p>{{room.name}}</p>
          <button class="btn btn-info" @click.prevent="joinRoom('room.name')">
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
    }
  },
  methods: {
    createRoom () {
      console.log(this.rooms)
      const payload = {
        // conditional, sesuaikan variable apa yang ada di localstorage
        name: this.roomName,
        creator: localStorage.getItem('username') || 'testing'
      }
      this.$socket.emit('createRoom', payload)
      console.log(payload)
      this.roomName = ''
    },
    checkConnect () {
      console.log('masuk check')
    }
  },
  created () {
    this.checkConnect()
    this.$socket.on('getRooms', data => {
      this.rooms = data
    })
  }
}
</script>

<style>

</style>
