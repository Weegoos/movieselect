<template>
  <div class="container q-pa-md">
    <p
      class="title q-pt-xl"
      :class="[$q.screen.width < 800 ? 'mobileTitle' : 'desktopTitle']"
    >
      Search TV Shows by Genre
    </p>
    <div class="search-container column text-white">
      <q-select
        standout
        filled
        label="Select Genre"
        :dense="dense"
        v-model="selectedGenre"
        :options="genres"
        @keyup.enter="searchTVShows"
        class="search-input"
      />
      <q-btn
        @click="searchTVShows"
        class="search-button bg-primary text-white q-mt-md"
        label="Search"
      />
    </div>
    <div v-if="tvShows.length > 0" class="results-container">
      <h2 class="subtitle">Results:</h2>
      <div class="tvShows-container">
        <div
          v-for="tvShow in tvShows"
          :key="tvShow.id"
          class="tvShow-card q-pa-md q-mb-md"
        >
          <q-img
            :src="'https://image.tmdb.org/t/p/w500/' + tvShow.poster_path"
            alt="TV Show Poster"
            v-if="tvShow.poster_path"
            class="tvShow-poster q-mb-sm"
          >
            <template v-slot:loading> <q-spinner-gears /> </template>
          </q-img>
          <q-circular-progress
            :value="tvShow.vote_average.toFixed(1) * 10"
            size="50px"
            :color="
              tvShow.vote_average.toFixed(1) * 10 >= 70 ? 'green' : 'yellow'
            "
            class="rating"
            show-value
          />
          <h3 class="tvShow-title">{{ tvShow.title_en || tvShow.name }}</h3>
          <div class="tvShow-details">
            <p class="tvShow-info">
              <strong>First Air Date:</strong>
              {{ formatDate(tvShow.first_air_date) }}
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
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const selectedGenre = ref(null);
const genres = ref([]);
const tvShows = ref([]);
const error = ref(null);
const dense = ref(false);

const apiKey = "455631d1f8cbe3eb25b45079f7a75431";
const getGenres = async () => {
  const genreUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`;
  try {
    const response = await axios.get(genreUrl);
    console.log("Fetched Genres:", response.data.genres); // Log fetched genres
    genres.value = response.data.genres.map((genre) => ({
      label: genre.name,
      value: genre.id,
    }));
  } catch (err) {
    console.error("Error fetching genres:", err);
  }
};

const searchTVShows = async () => {
  if (!selectedGenre.value) {
    error.value = "Please select a genre";
    return;
  }

  const genreId = selectedGenre.value.value; // Extract the genre ID
  const searchUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}`;
  console.log("API Request URL:", searchUrl); // Log the URL being requested
  try {
    const response = await axios.get(searchUrl);
    console.log("API Response:", response.data); // Debugging line
    if (response.data.results.length > 0) {
      tvShows.value = response.data.results.map((tvShow) => ({
        ...tvShow,
        title_en: tvShow.name,
        overview_en: tvShow.overview,
        trailer_link:
          tvShow.id === 1399
            ? "https://www.youtube.com/watch?v=KPLWWIOCOOQ"
            : null,
      }));
      error.value = null;
    } else {
      tvShows.value = [];
      error.value = "No TV shows found for the selected genre";
    }
  } catch (err) {
    console.error("Error fetching TV shows:", err);
    error.value = "Error fetching TV shows";
  }
};

const formatDate = (dateString) => {
  const options = { month: "long", day: "numeric", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

onMounted(() => {
  getGenres();
});
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

.tvShows-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
}

.tvShow-card {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.tvShow-title {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.tvShow-details {
  margin-bottom: 15px;
}

.tvShow-info {
  margin-bottom: 5px;
}

.tvShow-poster {
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
