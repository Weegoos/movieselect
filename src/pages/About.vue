<template>
  <div class="cytoscape-container column">
    <div ref="cyContainer" class="cytoscape-graph col"></div>
    <div class="q-pa-lg q-py-md text-white col">
      <q-timeline color="secondary">
        <transition appear @before-enter="beforeEnterText" @enter="enterText">
          <q-timeline-entry heading body="About us" />
        </transition>
        <p>Welcome to our website about movies and TV series!</p>
        <q-timeline-entry heading body="Our History" />
        <q-timeline-entry
          v-for="item in history"
          :key="item.date"
          :title="item.title"
          :subtitle="item.date"
          :avatar="item.avatar"
          :body="item.body"
          :icon="item.icon"
          :color="item.color"
        />
      </q-timeline>
      <!-- FAQ -->
      <div>
        <FAQ />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import cytoscape from "cytoscape";

export default {
  name: "CytoscapeGraph",

  setup() {
    const cyContainer = ref(null);
    let cy = null;

    const history = [
      {
        date: "June 17, 2024",
        title: "Project Initiation",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/6/6a/Logo_astana_it_university.png",
        body: "From the moment the idea of creating a website about finding movies and TV shows for every taste was conceived, an exciting journey into the world of web development began.",
      },
      {
        date: "June 24, 2024",
        title: "Development",
        body: `During the development of the movies and TV shows website, we focused on expanding its functionality and enhancing its appeal to users. We aimed to create an interactive space that not only provides information about various movies and TV shows but also inspires the creation of films and series.
      As the project progressed, we constantly implemented new features, enriching the user experience.`,
      },
      {
        date: "July 7, 2024",
        title: "Completion",
        icon: "done_all",
        body: "I, a student of Astana IT University, proudly present our trial version of my work. The realization of my idea and efforts, this movies and TV shows website is my contribution to the world of the Internet and an invitation to new discoveries. Author: Student of Astana IT University",
        color: "orange",
      },
    ];

    onMounted(async () => {
      try {
        const response = await fetch("/src/pages/data.json");
        const data = await response.json();

        cy = cytoscape({
          container: cyContainer.value,
          elements: data,
          style: [
            {
              selector: "node",
              style: {
                "background-color": "#30c9bc",
                width: 20,
                height: 20,
              },
            },
            {
              selector: "edge",
              style: {
                "curve-style": "haystack",
                "haystack-radius": 0,
                width: 5,
                opacity: 0.5,
                "line-color": "#a8eae5",
              },
            },
          ],
          layout: {
            name: "concentric",
            concentric: function (node) {
              return node.degree();
            },
            levelWidth: function (nodes) {
              return 2;
            },
          },
        });
      } catch (error) {
        console.error("Failed to fetch or parse data.json:", error);
      }
    });

    return {
      cyContainer,
      history,
    };
  },
};
</script>

<style scoped>
.cytoscape-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cytoscape-graph {
  width: 90vw;
  height: 90vh;
  /* border: 1px solid #ccc; */
}
</style>
