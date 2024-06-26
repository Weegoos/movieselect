<template>
  <div>
    <MovieByGenreComponent />
  </div>
</template>

<script setup>
import { onErrorCaptured } from "vue";
import MovieByGenreComponent from "../components/movieSelect/MovieByGenreComponent.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
onErrorCaptured((err, instance, info) => {
  $q.notify({
    message: `${err}: ${info}`,
    color: "negative",
    icon: "error",
  });
});
</script>

<style></style>
