const routes = [
  {
    path: '/',
    component: () => import('../pages/MainPage.vue'),
    
  },
  {
    path: '/films',
    children: [
      {
        path: 'year',
        component: () => import('../pages/MovieByYear.vue')
      }
    ]
  },
  

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
