<template>
  <div class="q-pa-md">
    <p
      class="text-white"
      :class="[
        $q.screen.width < 800 ? 'genreHeadlineMobile' : 'genreHeadlineDesktop',
      ]"
    >
      Explore our wide variety of categories
    </p>
    <p class="text-grey q-mb-md">
      Whether you're looking for a comedy to make you laugh, a drama to make you
      think, or a documentary to learn something new
    </p>

    <q-carousel
      swipeable
      animated
      v-model="slide"
      :autoplay="autoplay"
      ref="carousel"
      infinite
      transition-prev="jump-up"
      transition-next="jump-down"
      height="400px"
      class="bg-black"
    >
      <q-carousel-slide
        v-for="(chunk, index) in genreChunks"
        :key="index"
        :name="index"
      >
        <div class="genre-row q-gutter-md row">
          <div class="genre-block" v-for="genre in chunk" :key="genre.id">
            <div class="photos">
              <img
                v-for="(photo, index) in genre.photos"
                :key="index"
                :src="`https://image.tmdb.org/t/p/w200${photo}`"
                class="photo q-ml-md q-mt-md"
              />
            </div>
            <center>
              <div style="vertical-align: top">
                <q-btn no-caps dense flat class="text-white genreText">{{
                  genre.name
                }}</q-btn>
              </div>
            </center>
          </div>
        </div>
      </q-carousel-slide>

      <template v-slot:control>
        <q-carousel-control
          position="top-right"
          :offset="[18, 18]"
          class="text-white rounded-borders"
          style="background: rgba(0, 0, 0, 0.3); padding: 4px 8px"
        >
        </q-carousel-control>

        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
          class="q-gutter-xs"
        >
          <q-btn
            push
            round
            dense
            color="orange"
            text-color="black"
            icon="arrow_left"
            @click="$refs.carousel.previous()"
          />
          <q-btn
            push
            round
            dense
            color="orange"
            text-color="black"
            icon="arrow_right"
            @click="$refs.carousel.next()"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import {
  QCarousel,
  QCarouselSlide,
  QCarouselControl,
  QToggle,
  QBtn,
} from "quasar";

const slide = ref(1);
const autoplay = ref(false);

const genreArray = ref([
  { id: 28, name: "Action", photos: [] },
  { id: 27, name: "Horror", photos: [] },
  { id: 35, name: "Comedy", photos: [] },
  { id: 12, name: "Adventure", photos: [] },
  { id: 18, name: "Drama", photos: [] },
  { id: 14, name: "Fantasy", photos: [] },
  { id: 16, name: "Animation", photos: [] },
  { id: 99, name: "Documentary", photos: [] },
]);

const apiKey = "455631d1f8cbe3eb25b45079f7a75431";

const fetchGenrePhotos = async (genre) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        params: {
          api_key: apiKey,
          with_genres: genre.id,
        },
      }
    );
    const movies = response.data.results.slice(0, 4);
    genre.photos = movies.map((movie) => movie.poster_path);
  } catch (error) {
    console.error(error);
  }
};

const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const genreChunks = ref([]);

onMounted(async () => {
  for (const genre of genreArray.value) {
    await fetchGenrePhotos(genre);
  }
  genreChunks.value = chunkArray(genreArray.value, 4);
});
</script>

<style>
.genre-block {
  width: 300px;
  height: 372px;
  background-color: #262626;
  border-radius: 10px;
  box-sizing: border-box;
}

.photo {
  width: 120px;
  height: 140px;
  object-fit: cover;
  border-radius: 5px;
}

.carousel {
  max-width: 100%;
}

.genreText {
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}
.text-white {
  font-weight: bold;
}

/* desktop */
.genreHeadlineDesktop {
  font-size: 42px;
}

/* mobile */
.genreHeadlineMobile {
  font-size: 36px;
}
</style>
