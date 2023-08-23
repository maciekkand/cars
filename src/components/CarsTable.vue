<template>
  <div class="min-h-[670px]">
    <header>
      <h1 class="hidden text-3xl font-semibold xl:flex xl:justify-center xl:my-6">CarsTable</h1>
    </header>

    <div>
      <PopupModal
        v-if="showModal"
        message="Are you sure?"
        @shouldDelete="shouldDelete"
        alt="delete-row-confirmation-modal"
      />

      <UpdateModal
        v-if="showUpdateModal"
        message="Car update form"
        @shouldUpdate="shouldUpdate"
        alt="delete-row-confirmation-modal"
        :carId="carId"
        :carBrand="carBrand"
        :carYear="carYear"
        :carColor="carColor"
        :carPrice="carPrice"
      />

      <div class="leading-[3rem] grid w-full grid-cols-9 mt-12 text-xl bg-neutral-300 cursor-pointer">
        <p
          @click="sortBy('id')"
          class="pl-8"
        >Id &#x21f5;</p>

        <p
          @click="sortBy('brand')"
          class="col-span-2"
        >Brand &#x21f5;</p>

        <p
          @click="sortBy('year')"
          class="ml-4"
        >Year &#x21f5;</p>

        <p
          @click="sortBy('color')"
          class="ml-4"
        >Color &#x21f5;</p>

        <p
          @click="sortBy('price')"
          class="ml-8"
        >Price &#x21f5;</p>

        <p></p>
        <p></p>

        <img
          v-if="this.carsStore.getFavoriteIds.length"
          @click="clearFavorites"
          class="w-10 h-10 mt-1 -ml-3" src="../assets/heart-on.svg"
          alt="heart-on"
        >

        <img
          v-if="!this.carsStore.getFavoriteIds.length"
          class="w-10 h-10 mt-1 -ml-3"
          src="../assets/heart-off.svg"
          alt="heart-off"
        >

      </div>

      <ul
        v-for="item in carsStore.cars"
        :key="item.id"
        class="grid w-full grid-cols-9 text-lg odd:bg-neutral-300"
        alt="cars-table"
      >
        <li class="py-3 pl-8" alt="cars-table-car-id">{{ item.id }}</li>
        <li class="col-span-2 py-3 text-left" alt="cars-table-car-brand">{{ item.brand }}</li>
        <li class="py-3 ml-4" alt="cars-table-car-year">{{ item.year }}</li>
        <li class="py-3 ml-4" alt="cars-table-car-color">{{ item.color }}</li>
        <li class="py-3 text-right" alt="cars-table-car-price">{{ item.price && item.price.toLocaleString() }}</li>

        <button
          @click="updateRow(item)"
          class="w-24 h-8 my-2 ml-6 text-sm text-white bg-green-800 rounded-lg"
          alt="update-button"
        >Update</button>

        <button
          @click="deleteRow(item.id)"
          class="w-16 h-8 my-2 ml-6 text-sm text-white bg-red-800 rounded-lg"
          alt="delete-button"
        >Del</button>

        <img
          v-if="carsStore.getFavoriteIds.includes(item.id)"
          @click="addFavorite(item.id)"
          src="../assets/heart-on.svg"
          class="w-10 h-10 mt-1 -ml-3"
          alt="heart-on"

        >

        <img
          v-if="!carsStore.getFavoriteIds.includes(item.id)"
          @click="addFavorite(item.id)"
          src="../assets/heart-off.svg"
          class="w-10 h-10 mt-1 -ml-3"
          alt="heart-off"
        >

      </ul>

      <Pagination
        @newPagination="getRows"
        class="flex justify-center mt-4 lg:mt-8"
      />

    </div>
  </div>
</template>

<script>
import { useCarsStore } from '../stores/carsStore'
import Favorites from './Favorites.vue'
import Pagination from './Pagination.vue'
import PopupModal from './PopupModal.vue'
import UpdateModal from './UpdateModal.vue'

export default {
  name: 'CarsTable',

  components: {
    Pagination,
    PopupModal,
    UpdateModal,
    Favorites,
  },
  setup() {
    const carsStore = useCarsStore()
    return { carsStore }
  },
  data() {
    return {
      rows: [],
      favorites: [],
      idSortAsc: false,
      brandSortAsc: false,
      yearSortAsc: false,
      colorSortAsc: false,
      priceSortAsc: false,
      showModal: false,
      showUpdateModal: false,
      currentRowId: null,
      rowStart: null,
      limit: null,
      sortField: '',
      sortOrder: '',
      carId: null,
      carBrand: '',
      carYear: null,
      carColor: '',
      carPrice: null,
      localSortAsc: false,
      heartClicked: false
    }
  },
  methods: {
    setSortFieldsAsc(excludedVariable) {
      const sortFields = ['id', 'brand', 'year', 'color', 'price']
      const filteredSortAscVariables = sortFields.map(el => el + 'SortAsc').filter(el => el != excludedVariable)

      filteredSortAscVariables.map(el => {
        this[`${el}`] = true
      })
    },

    sortByFieldType(field, type) {
      if (type === 'numeric') {

        if (this.localSortAsc) {
          return this.carsStore.cars.sort ((a, b) => a[field] - b[field])
        }
        return this.carsStore.cars.sort ((a, b) => b[field] - a[field] )
      }

      if (this.localSortAsc) {
        return this.carsStore.cars.sort((a, b) => a[field].localeCompare(b[field]))
      }

      return this.carsStore.cars.sort((a, b) => b[field].localeCompare(a[field]))
    },

    localDataSort(field) {
      let rowsSorted = []
      if (field === 'id' || field === 'year' || field === 'price') {
        rowsSorted = this.sortByFieldType(field, 'numeric')
      }
      else {
        rowsSorted = this.sortByFieldType(field, 'text')
      }

      this.carsStore.cars = rowsSorted
      this.localSortAsc = !this.localSortAsc
    },

    fetchRows() {
      const carsObj = {
        start: this.rowStart,
        limit: this.limit,
        sort: this.sortField,
        order: this.sortOrder
      }

      this.carsStore.getRows(carsObj)
    },

    sortBy(field) {
      if (this.carsStore.isFilter) {
        return this.localDataSort(field)
      }

      this.rowStart = 0
      this.sortField = field
      const sortVariableName = `${field}SortAsc`

      this.sortOrder = ['desc', 'asc'][+this[`${sortVariableName}`]]
      this.fetchRows()

      this[`${sortVariableName}`] = !this[`${sortVariableName}`]
      this.setSortFieldsAsc(sortVariableName)
    },

    getRows(obj) {
      this.rowStart = obj?.start
      this.limit = obj?.limit
      this.fetchRows()
    },

    deleteRow(carId) {
      this.showModal = true
      this.currentRowId = carId

      this.carsStore.$state = {
        title: 'Kiha',
        user: {
          name: 'jacek', city: 'krk'
        }
      }
    },

    shouldDelete(isDelete) {
      if (isDelete) {
        this.carsStore.deleteRow(this.currentRowId, this.limit)
      }
      this.showModal = false
    },

    updateRow(car) {
      this.showUpdateModal = true
      this.carId = car.id
      this.carBrand = car.brand
      this.carYear = Number(car.year)
      this.carColor = car.color
      this.carPrice = Number(car.price)
    },

    shouldUpdate(modifiedCar) {
      if (!modifiedCar) {
        return this.showUpdateModal = false
      }

      if (!modifiedCar.brand) {
          return alert('Brand field is missing')
      }

      if (modifiedCar.brand === this.carBrand
        && modifiedCar.year == this.carYear
        && modifiedCar.color === this.carColor
        && modifiedCar.price == this.carPrice) {
          return alert('No data has changed')
      }

      if (modifiedCar) {
        this.carsStore.modifyRow(modifiedCar.id, modifiedCar, this.limit)
      }
      this.showUpdateModal = false
    },

    addFavorite(itemId) {
      if (this.carsStore.getFavoriteIds.includes(itemId)) {
        this.carsStore.favorites = this.carsStore.favorites.filter(el => {
          return el.id !== itemId
        })
      }
      else {
        const favoredCar = this.carsStore.cars.filter(el => el.id === itemId)[0]
        this.carsStore.favorites.push(favoredCar)
      }
    },

    clearFavorites() {
      this.carsStore.clearFavorites()
    },

  },
  mounted() {
    this.getRows()
  }
}
</script>
