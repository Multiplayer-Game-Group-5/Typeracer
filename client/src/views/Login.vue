<template>
  <section id="login">
    <div class="container-fluid" style="height: 100vh">
      <div class="d-flex align-items-center justify-content-center w-25 mx-auto">
        <div class="row" style="margin-top: 10px;">
          <img src="https://media.tenor.com/images/357eb8b509452f5afdf2c9afad8e583f/tenor.gif" class="img-fluid mb-3">
          <h1 class="mb-5" style="color: white; font-family: 'Poppins', sans-serif;">Welcome to Typeracer</h1>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="name" class="form-label" style="color: white; font-family: 'Poppins', sans-serif;">Username</label>
              <input type="text" class="form-control" id="name" v-model="username">
            </div>
            <div class="mb-3">
              <button type="submit" class="btn btn-warning w-100" style="font-family: 'Poppins', sans-serif">Login</button>
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

<style scoped>
@keyframes example {
  0%   {background-color:red}
  25%  {background-color:yellow}
  50%  {background-color:blue}
  75%  {background-color:green}
  100% {background-color:red}
}

.container-fluid {
  position: relative;
  background-color: red;
  animation-name: example;
  animation-duration: 4s;
  animation-delay: 2s;
  animation-iteration-count: infinite;
}

.mb-5 {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
</style>
