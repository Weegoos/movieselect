<template>
  <div>
    <MainPageMovie />
    <GenreMainPage />
    <Devices />
  </div>
</template>

<script setup>
import { onErrorCaptured } from "vue";
import MainPageMovie from "../components/main/MainPageMovie.vue";
import GenreMainPage from "../components/main/GenreMainPage.vue";
import Devices from "../components/main/Devices.vue";

import { useQuasar } from "quasar";

const q = useQuasar();
onErrorCaptured((err, instance, info) => {
  q.notify({
    message: err,
    color: "negative",
  });
});
</script>

<style></style>
