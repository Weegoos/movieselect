<template>
 <div>
  <div class="mainMovieContainer" :class="[$q.screen.width < 700 ? 'moviesContainerMobile' : 'movies-container']">
    <div v-for="movie in limitedMovies" :key="movie.id" :class="[$q.screen.width < 700 ? 'movieMobile' : 'movie']">
      <img :src="getMovieImage(movie.poster_path)" :alt="movie.title" />
    </div>
  </div>
  <img class=" absolute-center" :class="[$q.screen.width < 800 ? 'movieSelectIconMobile' : 'movieSelectIconDesktop']" src="../assets/movieSelectIcon.png" alt="">
  <img class=" absolute-center" :class="[$q.screen.width < 800 ? 'movieSelectPlayMobile' : 'movieSelectIconDesktop']" src="../assets/play.png" alt="">

 </div>
</template>


<script>
export default {
  data() {
    return {
      apiKey: '455631d1f8cbe3eb25b45079f7a75431',
      apiUrl: 'https://api.themoviedb.org/3/movie/popular',
      movies: [],
      maxMoviesDesktop: 15, 
      maxMoviesMobile: 9, 
    };
  },
  mounted() {
    this.fetchPopularMovies();
  },
  methods: {
    async fetchPopularMovies() {
      try {
        const response = await fetch(`${this.apiUrl}?api_key=${this.apiKey}`);
        const data = await response.json();
        this.movies = data.results;
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    },
    getMovieImage(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    },
  },
  computed: {
    limitedMovies() {
      return this.$q.screen.width < 700
        ? this.movies.slice(0, this.maxMoviesMobile)
        : this.movies.slice(0, this.maxMoviesDesktop);
    },
  },
};
</script>



<style scoped>
.mainMovieContainer{
  display: grid;
  gap: 10px;
  padding: 20px;
  opacity: 0.45;
}

.movies-container {
  grid-template-columns: repeat(5, 1fr); 
  grid-template-rows: repeat(2, 1fr); 
}

.movie {
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-height: 350px; 
}

.movie img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* mobile */

.moviesContainerMobile{
  grid-template-columns: repeat(3, 0.5fr);
  grid-template-rows: repeat(3, 1fr);
}

.movieMobile{
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* height: 200px;  */
}

.movieMobile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movieSelectIconMobile{
  width: 320px;
}

.movieSelectPlayMobile{
  width: 80px;
}

</style>


