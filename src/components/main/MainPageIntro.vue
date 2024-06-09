<template>
  <div>
      <center>
        <div class="q-pt-md">
        <p class="introtext q-pt-xl" :class="[$q.screen.width < 1200 ? 'introTextMobile' : 'introTextDesktop']">Movie resources</p>
        <p class="quoteText">A manual for joining the MovieSelect ecosystem. By builders for builders.</p>
        <q-btn label="Build now"  rounded flat class="introBtn" />
      </div>
      </center>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.introtext{
  padding-top: 60px;
}
</style>