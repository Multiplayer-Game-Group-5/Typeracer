<template>
  <section>
    <div class="container-fluid" style="background-color: rgb(96, 158, 145); height: 100vh">
      <div class="d-flex align-items-center justify-content-center w-25 mx-auto">
        <div class="row" style="margin-top: 200px;">
          <h1 class="mb-5">Welcome to Typeracer</h1>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="name" class="form-label">Username</label>
              <input type="text" class="form-control" id="name" v-model="username">
            </div>
            <div class="mb-3">
              <button type="submit" class="btn btn-warning w-100">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'Login',
  data () {
    return {
      username: ''
      // Nanti di v-model diinput login
    }
  },
  sockets: {
    sendAllUser (data) {
      this.$store.commit('FETCH_USERS', data)
    }
  },
  methods: {
    // Nanti ini di @click di submit login
    login () {
      if (this.users.length <= 3) {
        localStorage.setItem('username', this.username)
        const payloadUser = {
          username: this.username,
          points: 0
        }
        this.$socket.emit('login', payloadUser)
        this.$router.push('/play')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Room already full'
        })
      }
    }
  },
  computed: {
    ...mapState(['users'])
  },
  created () {
    this.$socket.emit('fetchUser')
  }
}
</script>

<style>

</style>
