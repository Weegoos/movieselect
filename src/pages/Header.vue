<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-layout
    view="hHh LpR lff"
    container
    style="height: 70px"
    class="fixed header rounded-borders"
  >
    <q-header class="q-mt-sm q-pl-md header">
      <q-toolbar class="q-gutter-sm" color="white">
        <q-btn color="black" icon="menu">
          <q-menu class="bg-black" style="color: white">
            <q-list style="min-width: 100px">
              <q-item v-close-popup clickable>
                <q-btn to="/" class="text" dense no-caps flat>Home</q-btn>
              </q-item>
              <q-item v-close-popup clickable>
                <q-btn to="/about" class="text" dense no-caps flat>About</q-btn>
              </q-item>
              <q-item clickable>
                <q-item-section> Search Movies </q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>

                <q-menu anchor="top end" self="top start">
                  <q-list dense>
                    <q-item v-for="film in menuFilms" :key="film.id" clickable>
                      <q-btn dense flat no-caps :to="film.link">{{
                        film.type
                      }}</q-btn>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
              <q-item clickable>
                <q-item-section>Search TV Shows</q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>

                <q-menu anchor="top end" self="top start">
                  <q-list dense>
                    <q-item
                      v-for="serial in menuSerials"
                      :key="serial.id"
                      clickable
                    >
                      <q-btn dense flat no-caps :to="serial.link">{{
                        serial.type
                      }}</q-btn>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
              <q-separator />
            </q-list>
          </q-menu>
        </q-btn>
        <div class="text-h5" style="color: white">
          Movie Select
          <q-badge outline align="middle" color="teal"> v1.1.3 </q-badge>
        </div>
      </q-toolbar>
    </q-header>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      menuFilms: [
        {
          id: 1,
          type: "By Year",
          link: "/films/year",
        },
        {
          id: 2,
          type: "By Genre",
          link: "/films/genre",
        },
        {
          id: 3,
          type: "By Title",
          link: "/films/name",
        },
      ],

      menuSerials: [
        {
          id: 1,
          type: "By Year",
          link: "/serial/year",
        },
        {
          id: 2,
          type: "By Genre",
          link: "/serial/genre",
        },
        {
          id: 3,
          type: "By Title",
          link: "/serial/name",
        },
      ],
    };
  },
};
</script>

<style>
.header {
  background-color: transparent;
  z-index: 1;
}
</style>
