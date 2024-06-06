<template>
    <div class="container q-pa-md">

      <p class="title" :class="[$q.screen.width < 800 ? 'mobileTitle' : 'desktopTitle']">Поиск фильмов по году</p>
      <div class="search-container">
        <q-input label="Поиск по году" :dense="dense" maxlength="4"  counter v-model="year" type="number"  @keyup.enter="searchMovies" class="search-input" />
        <q-btn @click="searchMovies" class="search-button q-mt-lg" label="Поиск" style="max-height: 20px;"/>
      </div>
      <div v-if="movies.length > 0">
        <h2 class="subtitle">Результаты:</h2>
        <div class="movies-container">
          <div v-for="movie in movies" :key="movie.id" class="movie-card">
            <h3 class="movie-title">{{ movie.title_ru || movie.title }}</h3>
            <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" alt="Постер фильма" v-if="movie.poster_path" class="movie-poster" />
            <div class="movie-details">
              <p class="movie-info"><strong>Дата выпуска:</strong> {{ movie.release_date }}</p>
              <p class="movie-info"><strong>Описание:</strong> {{ movie.overview_ru || movie.overview }}</p>
              <p class="movie-info"><strong>Рейтинг:</strong> {{ movie.vote_average }}</p>
              <p class="movie-trailer" v-if="movie.trailer_link"><a :href="movie.trailer_link" target="_blank">Ссылка на трейлер</a></p>
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
        dense: ref(false)
      };
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
              title_ru: movie.title === "Interstellar" ? "Интерстеллар" : movie.title, // Пример перевода названия фильма
              overview_ru: movie.overview === "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage." ? "Приключения группы исследователей, использующих недавно обнаруженное червоточину, чтобы преодолеть ограничения в человеческом космическом путешествии и покорить огромные расстояния в межзвездном путешествии." : movie.overview, // Пример перевода описания фильма
              trailer_link: movie.id === 157336 ? "https://www.youtube.com/watch?v=zSWdZVtXT7E" : null // Пример ссылки на трейлер
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
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    margin: 0 auto;
  }


  .title{
    font-weight: bold;
  }

  .mobileTitle{
    font-size: 28px;
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
  }
  
  .subtitle {
    font-size: 1.5em;
    margin-bottom: 10px;
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
  }
  
  .error-message {
    margin-top: 20px;
    color: #ff0000;
  }
  </style>
  