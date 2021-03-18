<template>
  <div class="container">
    <h1>Lobby</h1>
    <p>Waiting for Players</p>
    <div v-if="room.creator == creatorName">
      <button @click.prevent="start" class="btn btn-danger">Start</button>
    </div>
    <div class="container">
      <div class="container" v-for="(user, idx) in room.users" :key="idx">
        <h3>{{ user }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      room: {},
      creatorName: ''
    }
  },
  sockets: {
    roomDetail (data) {
      this.room = data
      console.log(this.room)
    },
    startGame () {
      this.$router.push(`/play/${this.room.roomName}`)
    }
  },
  methods: {
    start () {
      // console.log(this.room.roomName)
      this.$socket.emit('startGame', this.room.roomName)
      // ini mengarah ke halaman permainan
      this.$router.push(`/play/${this.room.roomName}`)
    }
  },
  created () {
    // this.refresh()
    this.creatorName = localStorage.getItem('username')
  }
}
</script>

<style>
</style>
