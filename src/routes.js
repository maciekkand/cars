import HomeView from './views/HomeView.vue'

export const routes = [
  { path: '', name: 'home', component: HomeView },
  { path: '/fav', name: 'fav', component: () => import('./views/FavoritesView.vue') },
]
