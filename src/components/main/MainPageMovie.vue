<template>
    <div>
      <div class="mainMovieContainer" :class="[$q.screen.width < 700 ? 'moviesContainerMobile' : 'movies-container']">
        <div v-for="movie in limitedMovies" :key="movie.id" :class="[$q.screen.width < 700 ? 'movieMobile' : 'movie']">
          <img :src="getMovieImage(movie.poster_path)" :alt="movie.title" />
        </div>
      </div>
      <div>
        <p class="text-white" align="center" :class="[$q.screen.width < 700 ? 'streamingIntroMobile' : 'streamingIntroDesktop']">The Best Streaming Experience</p>
        <p class="text-grey" style="font-size: 20px" align="center">StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere.</p>
       <center> <q-btn color="negative" class="q-pa-sm" no-caps icon="tv" bordered label="Start Watching Now" @click="onClick" style="font-size: 18px;" /></center>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useQuasar } from 'quasar';
  
  export default {
    setup() {
      const q = useQuasar();
  
      const apiKey = '455631d1f8cbe3eb25b45079f7a75431';
      const apiUrl = 'https://api.themoviedb.org/3/movie/popular';
      const movies = ref([]);
      const maxMoviesDesktop = 15;
      const maxMoviesMobile = 9;

      let startTime;
      let endTime;
  
      const fetchPopularMovies = async () => {
        try {
          startTime = performance.now();
          const response = await fetch(`${apiUrl}?api_key=${apiKey}`);
          const data = await response.json()
          movies.value = data.results;
          endTime = performance.now(); 
          console.log(`Время загрузки всех фотографий: ${endTime - startTime} мс`);
          const times = endTime - startTime
          const timer = setTimeout(() => {
            q.notify({
              message: 'Фотографии загружены',
              icon: 'check',
              color: 'positive'
            })
          }, times);
        } catch (error) {
          throw new Error('Error fetching popular movie')

        }
      };
  
      onMounted(() => {
        fetchPopularMovies();
      });
  
      const limitedMovies = computed(() => {
        return q.screen.width < 700
          ? movies.value.slice(0, maxMoviesMobile)
          : movies.value.slice(0, maxMoviesDesktop);
      });
  
      const getMovieImage = (path) => {
        return `https://image.tmdb.org/t/p/w500${path}`;
      };
  
      return {
        q,
        limitedMovies,
        getMovieImage,
      };
    },
  };
  </script>
  
  <style scoped>
  .mainMovieContainer {
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
  
  .moviesContainerMobile {
    grid-template-columns: repeat(3, 0.5fr);
    grid-template-rows: repeat(3, 1fr);
  }
  
  .movieMobile {
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* height: 200px; */
  }
  
  .movieMobile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .movieSelectIconMobile {
    width: 320px;
  }
  
  .movieSelectPlayMobile {
    width: 80px;
  }

  .streamingIntroMobile{
    font-size: 42px;
  }

  .streamingIntroDesktop{
    font-size: 72px;
  }
  </style>
  