import { defineStore } from 'pinia'
import { getRowsMixin, deleteRowMixin, modifyRowMixin, addRowMixin, filterItemsMixin } from '../mixins/apiMixin'

export const useCarsStore = defineStore('carsStore', {
  state: () => ({
    cars: [],
    favorites: [],
    isFilter: false,
  }),

  getters: {
    getFavoriteIds() {
      return this.favorites.map(el => el.id)
    }
  },

  actions: {
    clearFavorites() {
      this.favorites = []
    },

    getRows(parameters) {
      getRowsMixin(parameters)
        .then(res => this.cars = res.data)
    },

    deleteRow(id, limit) {
      deleteRowMixin(id)
        .then(res => getRowsMixin({ limit }))
        .then(res => this.cars = res.data)
    },

    modifyRow(id, car, limit) {
      modifyRowMixin(id, car)
        .then(res => getRowsMixin({ limit }))
        .then(res => this.cars = res.data)
      },

    addRow(obj) {
      return addRowMixin(obj)
        .then(res => this.cars = res.data)
    },

    filterRows(obj) {
      filterItemsMixin(obj)
        .then(res => this.cars = res.data)
    }
  }
})
