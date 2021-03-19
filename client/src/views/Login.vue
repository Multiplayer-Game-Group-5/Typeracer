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
export default {
  name: 'Login',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    login () {
      localStorage.setItem('username', this.username)
      this.$router.push('/rooms')
      this.$socket.emit('login', this.username)
      this.username = ''
    }
  }
}
</script>

<style>
</style>
