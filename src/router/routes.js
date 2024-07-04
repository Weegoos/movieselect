const routes = [
  {
    path: "/",
    component: () => import("../pages/MainPage.vue"),
  },
  {
    path: "/about",
    component: () => import("../pages/About.vue"),
  },
  {
    path: "/films",
    children: [
      {
        path: "year",
        component: () => import("../pages/MovieByYear.vue"),
      },
      {
        path: "genre",
        component: () => import("../pages/MovieByGenre.vue"),
      },
      {
        path: "name",
        component: () => import("../pages/MovieByName.vue"),
      },
    ],
  },
  {
    path: "/serial",
    children: [
      {
        path: "year",
        component: () => import("../pages/SeriesByYear.vue"),
      },
      {
        path: "genre",
        component: () => import("../pages/SeriesByGenre.vue"),
      },
      {
        path: "name",
        component: () => import("../pages/SeriesByName.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
