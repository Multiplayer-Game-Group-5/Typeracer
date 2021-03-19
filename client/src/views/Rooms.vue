<template>
    <section>
      <div class="container-fluid" style="height: 100vh">
        <div class="d-flex justify-content-center mx-auto">
          <div class="row" style="margin-top: 100px;">
            <div class="card shadow mb-5 overflow-auto" style="width: 40rem; height: 40vw">
              <h1 class="card-title text-center my-3">Create Room</h1>
                <!-- Form -->
                <form @submit.prevent="createRoom">
                  <input
                    v-model="roomName"
                    type="text"
                    placeholder="create a room"
                  />
                  <div class="card-body text-center">
                    <button type="submit" class="btn btn-warning p-2 m-2">Create Room</button>
                  </div>
                </form>
                <!-- End form -->
                <div class="container" v-if="rooms.length != 0">
                  <div class="d-flex justify-content-center" v-for="(room, idx) in rooms" :key="idx">
                    <div class="card width-100 mb-4" style="width: 400px">
                      <div class="mt-3">
                        <h5>{{ room.roomName }}</h5>
                      </div>
                      <div class="d-flex justify-content-center">
                        <button class="btn btn-info my-3" style="width: 200px" @click.prevent="joinRoom(room.roomName)">
                          Join Room
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container" v-else >
                  <p>No Room available, please create a room</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
