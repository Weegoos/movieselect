<template>
  <div class="container q-pa-md">
    <p
      class="title q-pt-xl"
      :class="[$q.screen.width < 800 ? 'mobileTitle' : 'desktopTitle']"
    >
      Search TV Shows by Title
    </p>
    <div class="search-container column text-white">
      <q-input
        standout
        filled
        label="Enter TV Show Title"
        :dense="dense"
        v-model="searchQuery"
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
      <div class="tv-shows-container">
        <div
          v-for="show in tvShows"
          :key="show.id"
          class="show-card q-pa-md q-mb-md"
        >
          <q-img
            :src="'https://image.tmdb.org/t/p/w500/' + show.poster_path"
            alt="TV Show Poster"
            v-if="show.poster_path"
            class="show-poster q-mb-sm"
          >
            <template v-slot:loading> <q-spinner-gears /> </template>
          </q-img>
          <q-circular-progress
            :value="show.vote_average.toFixed(1) * 10"
            size="50px"
            :color="
              show.vote_average.toFixed(1) * 10 >= 70 ? 'green' : 'yellow'
            "
            class="rating"
            show-value
          />
          <h3 class="show-title">{{ show.name_en || show.name }}</h3>
          <div class="show-details">
            <p class="show-info">
              <strong>First Air Date:</strong>
              {{ formatDate(show.first_air_date) }}
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
const tvShows = ref([]);
const error = ref(null);
const dense = ref(false);

const apiKey = "455631d1f8cbe3eb25b45079f7a75431";

const searchTVShows = async () => {
  if (!searchQuery.value.trim()) {
    error.value = "Please enter a TV show title";
    return;
  }

  const encodedQuery = encodeURIComponent(searchQuery.value.trim());
  const searchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodedQuery}`;
  console.log("API Request URL:", searchUrl);
  try {
    const response = await axios.get(searchUrl);
    console.log("API Response:", response.data);
    if (response.data.results.length > 0) {
      tvShows.value = response.data.results.map((show) => ({
        ...show,
        name_en: show.name,
        overview_en: show.overview,
        trailer_link:
          show.id === 1399
            ? "https://www.youtube.com/watch?v=zSWdZVtXT7E"
            : null,
      }));
      error.value = null;
    } else {
      tvShows.value = [];
      error.value = "No TV shows found for the entered title";
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

.tv-shows-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
}

.show-card {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.show-title {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.show-details {
  margin-bottom: 15px;
}

.show-info {
  margin-bottom: 5px;
}

.show-poster {
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
