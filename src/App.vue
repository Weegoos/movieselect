<template>
  <div>
    <div>
      <headerPage />
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import headerPage from './pages/Header.vue';4

onBeforeMount(() => {
  console.clear()
})
</script>
