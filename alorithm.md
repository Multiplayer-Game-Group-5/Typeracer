--Server
app.js
let users = [] max.4
let words = [] random words

Words di random -> masukin ke state

--Store

State:
word: ‘’,
users: [
    {
        name: '' (dari localStorage.name)
        points: 0
    },
    {
        name: ''
        points: 0
    }
]


--Di tampilan Play
--login inputan dari form login di localStorange.name = this.username

--Play
Name dapet dari this.$store.state.users.name
Points dapet dari this.$store.state.users.points

Random Words dari this.$store.state.word

inputWord disamain sama Random Words (this.$store.state.word)
Ketika disubmit
if (inputWord === this.$store.state.word) {
    this.$store.commit('increasePoint', 10)
    this.$store.dispatch('randomWords', )
} else {
    swal fail
}

