<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-layout 
  view="lHh LpR lff"
  container 
  style="height: 70px"
  class="shadow-2 rounded-borders"

  >
    <q-header class="bg-transparent text-black q-mt-sm q-pl-md">
        <q-toolbar class="q-gutter-sm">
          <q-btn color="black" icon="menu">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-btn to="/" dense no-caps flat>Домой</q-btn>
            </q-item>
            <q-item clickable>
                <q-item-section>Поиск фильмов</q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>

                <q-menu anchor="top end" self="top start">
                  <q-list dense>
                    <q-item
                      v-for="film in menuFilms"
                      :key="film.id"
                      clickable
                    >
                      <q-btn dense flat no-caps :to="film.link">{{ film.type }}</q-btn>
                    </q-item>
                  </q-list>
                </q-menu>

              </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>New incognito tab</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Recent tabs</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>History</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Downloads</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Help &amp; Feedback</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
            <div class="text-h5">
              Movie Select
          <q-badge outline align="middle" color="teal">
            v1.1.0
        </q-badge>
    </div>
        </q-toolbar>
    </q-header>
  </q-layout>
</template>

<script>
export default {
 data () {
  return {
    menuFilms: [
      {
        id: 1,
        type: 'По году',
        link: '/films/year'
      },
      {
        id: 2,
        type: 'По жанру'
      },
      {
        id: 3,
        type: 'По название'
      }
    ]
  }
 }
}
</script>

<style>

</style>