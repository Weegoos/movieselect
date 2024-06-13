<template>
  <div>
    <MainPageMovie />
  </div>
</template>

<script setup>
  import { onErrorCaptured } from 'vue';
  import MainPageMovie from '../components/main/MainPageMovie.vue';
import { useQuasar } from 'quasar';

  const q = useQuasar()
  onErrorCaptured((err, instance, info) => {
    q.notify({
      message: err,
      color: 'negative'
    })
  })
</script>

<style>

</style>