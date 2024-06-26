<template>
  <div class="container q-pa-md">
    <p
      class="title q-pt-xl"
      :class="[$q.screen.width < 800 ? 'mobileTitle' : 'desktopTitle']"
    >
      Search Movies by Title
    </p>
    <div class="search-container column text-white">
      <q-input
        standout
        filled
        label="Enter Movie Title"
        :dense="dense"
        v-model="searchQuery"
        @keyup.enter="searchMovies"
        class="search-input"
      />
      <q-btn
        @click="searchMovies"
        class="search-button bg-primary text-white q-mt-md"
        label="Search"
      />
    </div>
    <div v-if="movies.length > 0" class="results-container">
      <h2 class="subtitle">Results:</h2>
      <div class="movies-container">
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="movie-card q-pa-md q-mb-md"
        >
          <q-img
            :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
            alt="Movie Poster"
            v-if="movie.poster_path"
            class="movie-poster q-mb-sm"
          >
            <template v-slot:loading> <q-spinner-gears /> </template>
          </q-img>
          <q-circular-progress
            :value="movie.vote_average.toFixed(1) * 10"
            size="50px"
            :color="
              movie.vote_average.toFixed(1) * 10 >= 70 ? 'green' : 'yellow'
            "
            class="rating"
            show-value
          />
          <h3 class="movie-title">{{ movie.title_en || movie.title }}</h3>
          <div class="movie-details">
            <p class="movie-info">
              <strong>Release Date:</strong>
              {{ formatDate(movie.release_date) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const searchQuery = ref("");
const movies = ref([]);
const error = ref(null);
const dense = ref(false);

const apiKey = "455631d1f8cbe3eb25b45079f7a75431";

const searchMovies = async () => {
  if (!searchQuery.value.trim()) {
    error.value = "Please enter a movie title";
    return;
  }

  const encodedQuery = encodeURIComponent(searchQuery.value.trim());
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodedQuery}`;
  console.log("API Request URL:", searchUrl); // Log the URL being requested
  try {
    const response = await axios.get(searchUrl);
    console.log("API Response:", response.data); // Debugging line
    if (response.data.results.length > 0) {
      movies.value = response.data.results.map((movie) => ({
        ...movie,
        title_en: movie.title,
        overview_en: movie.overview,
        trailer_link:
          movie.id === 157336
            ? "https://www.youtube.com/watch?v=zSWdZVtXT7E"
            : null,
      }));
      error.value = null;
    } else {
      movies.value = [];
      error.value = "No movies found for the entered title";
    }
  } catch (err) {
    console.error("Error fetching movies:", err);
    error.value = "Error fetching movies";
  }
};

const formatDate = (dateString) => {
  const options = { month: "long", day: "numeric", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-weight: bold;
  color: #333;
  text-align: center;
}

.mobileTitle {
  font-size: 24px;
}

.desktopTitle {
  font-size: 36px;
}

.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  max-width: 300px;
  margin-bottom: 10px;
  background-color: aliceblue;
}

.search-button {
  width: 100%;
  max-width: 150px;
}

.results-container {
  margin-top: 20px;
}

.subtitle {
  font-size: 1.5em;
  margin-bottom: 10px;
  text-align: center;
}

.movies-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
}

.movie-card {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
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

.movie-poster {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.error-message {
  margin-top: 20px;
  color: #ff0000;
  text-align: center;
}

.rating {
  position: relative;
  margin: 10px auto;
}
</style>
