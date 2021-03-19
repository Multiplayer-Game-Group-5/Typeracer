<template>
  <div class="container">
    <div class="container-fluid" style="height: 100vh">
        <div class="d-flex justify-content-center mx-auto">
          <div class="row" style="margin-top: 100px;">
            <div class="card shadow mb-5 overflow-auto" style="width: 40rem; height: 40vw">
              <h1 class="card-title text-center my-3">Lobby</h1>
              <p>Waiting for Players</p>
              <div v-if="room.creator == creatorName">
                <button @click.prevent="start" class="btn btn-danger mb-4">Start Game</button>
              </div>
              <div class="container">
                <div class="container" v-for="(user, idx) in room.users" :key="idx">
                  <div class="d-flex justify-content-center">
                    <div class="card width-100 mb-4" style="width: 300px">
                        <div class="my-3">
                          <h5>Username:</h5>
                          <h5>{{ user.username }}</h5>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- <h1>Lobby</h1>
    <p>Waiting for Players</p>
    <div v-if="room.creator == creatorName">
      <button @click.prevent="start" class="btn btn-danger">Start</button>
    </div>
    <div class="container">
      <div class="container" v-for="(user, idx) in room.users" :key="idx">
        <h3>{{ user }}</h3>
      </div>
    </div> -->
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
