<template>
  <section>
    <div class="container-fluid" style="background-color: rgb(96, 158, 145); height: 120vh">
      <div class="d-flex align-items-center justify-content-center w-25 mx-auto">
        <div class="row" style="margin-top: 200px;">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Random Word</h5>
              <h1 v-if="users.length >= 2" class="card-text">{{ word }}</h1>
              <h1 v-else class="card-text">Waiting for players</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="d-flex justify-content-center">
          <div class="row bg-light p-4" style="margin-top: 100px;">
            <UserCard v-for="(user, i) in users" :key="i" :user="user"></UserCard>
            <div class="col-12 mb-3">
              <label for="answer" class="form-label"></label>
              <input type="text" class="form-control text-center" id="answer" v-model="inputWord" @keyup.enter="submitWord">
            </div>
            <div class="d-flex justify-content-center">
              <a type="submit" class="btn btn-warning p-2 m-2" @click.prevent="submitWord">Submit</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import UserCard from '../components/UserCard'
import Swal from 'sweetalert2'

export default {
  name: 'Play',
  data () {
    return {
      inputWord: ''
    }
  },
  sockets: {
    nextWord (data) {
      this.$store.commit('CHANGE_WORD', data)
    },
    getUsers (data) {
      this.$store.commit('FETCH_USERS', data)
    },
    sendAllUser (data) {
      this.$store.commit('FETCH_USERS', data)
    },
    updatedScore (data) {
      this.$store.commit('FETCH_USERS', data)
    },
    getWinner (data) {
      // Swal menang, suruh login
      Swal.fire({
        title: `Congratulation ${data.username}!`,
        text: 'Winner winner chicken dinner!',
        imageUrl: 'https://media1.giphy.com/media/gxEAWPmfEzYdAUFAi9/giphy.gif',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image'
      })
      this.$router.push('/')
    }
  },
  methods: {
    submitWord () {
      if (this.inputWord === this.word) {
        // Tambah 10 point user
        this.$socket.emit('addPoint', localStorage.username)
        this.$socket.emit('fetchUser')
        this.inputWord = ''
        // Minta random word pake socket.io buat change this.wordnya
        this.$socket.emit('changeWord')
      } else {
        // Swal wrong word
        let timerInterval
        Swal.fire({
          title: 'Wrong!',
          html: 'Punished for <b></b> milliseconds.',
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              const content = Swal.getContent()
              if (content) {
                const b = content.querySelector('b')
                if (b) {
                  b.textContent = Swal.getTimerLeft()
                }
              }
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
        console.log('Kata salah')
      }
    }
  },
  computed: {
    ...mapState(['word', 'users'])
  },
  created () {
    this.$socket.emit('changeWord')
    this.$socket.emit('fetchUser')
  },
  components: {
    UserCard
  }
}
</script>

<style>

</style>
