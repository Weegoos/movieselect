<template>
    <div class="container q-pa-md">
      <p class="title q-pt-xl" :class="[$q.screen.width < 800 ? 'mobileTitle' : 'desktopTitle']">Поиск фильмов по году</p>
      <div class="search-container column">
        <q-input  label="Поиск по году" :dense="dense" maxlength="4"  counter v-model="year" type="number"  @keyup.enter="searchMovies" class="search-input" /> <br>
        <q-btn @click="searchMovies" class="search-button bg-white" label="Поиск" style="max-height: 20px;"/>
      </div>
      <div v-if="movies.length > 0">
        <h2 class="subtitle">Результаты:</h2>
        <div class="movies-container">
          <div v-for="movie in movies" :key="movie.id" class="movie-card">
            <q-img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" alt="Постер фильма" v-if="movie.poster_path" class="movie-poster q-mb-sm" />
            <q-circular-progress
                :value="movie.vote_average.toFixed(1) * 10"
                size="50px"
                :color="movie.vote_average.toFixed(1) * 10 >= 70 ? 'green' : 'yellow'"
                class="rating"
                show-value
        >
        </q-circular-progress>
            <h3 class="movie-title">{{ movie.title_ru || movie.title }}</h3>
            <div class="movie-details">
                <p class="movie-info"><strong>Дата выпуска:</strong> {{ formatDate(movie.release_date) }}</p>
              <!-- <p class="movie-trailer" v-if="movie.trailer_link"><a :href="movie.trailer_link" target="_blank">Ссылка на трейлер</a></p> -->
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref } from 'vue'
  export default {
    data() {
      return {
        year: ref(''),
        movies: [],
        error: null,
        dense: ref(false),
        color: 'orange'
      };
    },
    mounted(){
        
    },
    methods: {
        async searchMovies() {

    const apiKey = '455631d1f8cbe3eb25b45079f7a75431';
    
    const searchUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${this.year}`;
    
    try {
   
    const response = await axios.get(searchUrl);

    if (response.data.results.length > 0) {
      
        this.movies = response.data.results.map(movie => ({
            ...movie,
            title_ru: translateToRussian(movie.title), 
            overview_ru: translateToRussian(movie.overview),
          
            trailer_link: movie.id === 157336 ? "https://www.youtube.com/watch?v=zSWdZVtXT7E" : null 
        }));
        
        this.error = null;
    } else {
      
        this.movies = [];
        this.error = 'Фильмы за указанный год не найдены';
    }
} catch (error) {
   
    console.error('Ошибка при получении фильмов:', error);
    this.error = 'Ошибка при получении фильмов';
}


function translateToRussian(text) {
 
    return text;
}

},
formatDate(dateString) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', options);
  }

    },
  };
  </script>
  
  <style>
  :root{
    --characteristic: 50px;
  }
  .container {
    margin: 0 auto;
  }

  .search-button{
    max-width: 150px;
  }

  .title{
    font-weight: bold;
    color: white;
    font-size: 150px;
  }

  .mobileTitle{
    font-size: 28px;
  }

  .desktopTitle{
    font-size: 54px;
  }
  
  .search-container {
    display: flex;
    margin-bottom: 20px;
  }
  
  .search-input {
    flex: 1;
    font-size: 1em;
    padding: 0.5em;
    margin-right: 0.5em;
    /* border: solid red 1px; */
    border-radius: 7px;
    background-color: white;
  }
  
  .subtitle {
    font-size: 1.5em;
    margin-bottom: 10px;
    color: white;
  }
  
  .movies-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
  }
  
  .movie-card {
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .movie-title {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  
  .movie-details {
    margin-bottom: 15px;
  }
  
  .movie-info {
    margin-bottom: 5px;
  }
  
  .movie-trailer a {
    color: #007bff;
    text-decoration: none;
  }
  
  .movie-poster {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }
  
  .error-message {
    margin-top: 20px;
    color: #ff0000;
  }

  .rating{
    position: relative;
    margin-top: -45px;
    background-color: black;
    color: white;
    border-radius: 50%;
  }
  </style>
  