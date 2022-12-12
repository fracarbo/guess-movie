const { createApp } = Vue

createApp({
  data() {
    return {
      guess: '',
      movie: {},
      movieIsLoading: true
    }
  },
  methods: {
    fetchMovie() {
      this.movieIsLoading = true
      fetch("./backend/getMovie.php")
        .then(response => response.json())
        .then(data => {
          this.movie = data
          //console.log(this.movie);
          this.movieIsLoading = false
        })
        .catch(error => console.log("Si è verificato un errore!"))
    },
    fetchMoviesList() {
      fetch("./backend/moviesList.php")
        .then(response => response.json())
        .then(data => {
          this.moviesList = data
          console.log(this.moviesList);
        })
        .catch(error => console.log("Si è verificato un errore!"))
    },
    guessMovie() {
      let msg
      this.guess = this.guess.toLowerCase().trim()
      const userGuessed = this.guess === this.movie.title.toLowerCase()
      if (userGuessed) {
        msg = "Indovinato"
        this.fetchMovie()
      } else {
        msg = "Sbagliato"
      }
      this.guess = ''
      alert(msg)
    },
    surrend() {
      alert(`Era: ${this.movie.title}`)
      this.guess = ''
      this.fetchMovie()
    }
  },
  mounted() {
    this.fetchMovie()
    this.fetchMoviesList()
  }
}).mount('#app')