<template>
  <div>
    <header>
      <h1 class="flex justify-center my-6 text-3xl font-semibold xl:hidden">CarsTable</h1>
    </header>

    <div class="h-4 border border-white w-72">
      <CarsAlert
        v-if="showAlert"
        :type="alertType"
        :message="alertMessage"
        class="ml-10 -mt-6 xl:mt-8 xl:ml-0"
      />
    </div>

    <div class="flex justify-center gap-2 xl:my-6 md:gap-7 xl:flex-col xl:mr-8 xl:mt-[5.5rem] xl:gap-[23px] xl:text-lg">

      <InputBox
        v-model="brand"
        inputName=""
        :stringInput=true
        inputPlaceholder="car brand"
        alt="car-name"
      />

      <InputBox
        v-model="year"
        inputName=""
        :stringInput=false
        inputPlaceholder="year"
        :minNumber="1900"
        :maxNumber="2050"
        alt="car-year"
      />

      <InputBox
        v-model="color"
        inputName=""
        :stringInput=true
        inputPlaceholder="color"
        alt="car-color"
      />

      <InputBox
        v-model="price"
        inputName=""
        :stringInput=false
        inputPlaceholder="price"
        :minNumber="100"
        :maxNumber="100000"
        :stepNumber="100"
        alt="car-price"
      />

      <button
        @click="filterItems"
        class="w-24 h-[42px] text-xl text-white bg-blue-600 rounded-lg mt-[4px] xl:mt-[18px]  disabled:opacity-50"
        alt="filter-car-button"
        :disabled="filterButtonDisabled"
      >Filter</button>

      <button
        @click="addItem"
        class="w-24 h-[42px] text-xl text-white bg-blue-600 rounded-lg mt-[4px] xl:mt-[18px]"
        alt="add-car-button"
      >Add</button>

      <button
        @click="showFavorites"
        class="w-24 h-[42px] text-xl text-white bg-blue-600 rounded-lg mt-[4px] xl:mt-[18px]  disabled:opacity-50"
        alt="show-favorite-cars"
        :disabled="favoritesButtonDisabled"
      >Favs</button>

      <button
        @click="resetValidation"
        class="w-24 h-[42px] text-xl text-white bg-blue-600 rounded-lg mt-[4px]"
        alt="reset-form-button"
      >Reset</button>

    </div>
  </div>
</template>

<script>
import { useCarsStore } from '../stores/carsStore'
import InputBox from './InputBox.vue'
import CarsAlert from './CarsAlert.vue';
import { alphanumericAndSingleSpaces } from '../helpers/sanitizer'

export default {
  name: 'CarsForm',
  components: {
    InputBox,
    CarsAlert,
  },
  setup() {
    const carsStore = useCarsStore()
    return { carsStore }
  },
  data() {
    return {
      brand: '',
      year: '',
      color: '',
      price: '',
      showAlert: false,
      alertType: '',
      alertMessage: '',
    };
  },
  computed: {
    favoritesButtonDisabled() {
      return !this.carsStore.favorites.length
    },
    filterButtonDisabled() {
      if(!this.brand && !this.brand && !this.brand && !this.brand ) {
        return true
      }
    }
  },
  methods: {
    resetValidation() {
      this.showAlert = false
      this.brand = ''
      this.year = ''
      this.color = ''
      this.price = ''
      this.carsStore.getRows({})
    },

    validate() {
      let message = ''
      this.brand = alphanumericAndSingleSpaces(this.brand)

      if (this.brand.length < 3) {
        message = 'Name is too short (3-20)'
      }
      else if (this.year < 1900) {
        message = 'Year should be 1900+'
      }
      else if (!this.color || this.color.length < 3) {
        message = 'Color is missing or too short (3+)'
      }
      else if (this.price < 100 || this.price > 100000) {
        message = 'Price should be 100-100,000'
      }

      return message ? this.displayAlert('error', message) : true
    },

    displayAlert(type, message) {
      this.showAlert = true
      this.alertType = type
      this.alertMessage = message
    },

    async addItem() {
      if (!this.validate()) return

      const obj = {
        brand: this.brand,
        year: this.year,
        color: this.color,
        price: this.price
      }

      await this.carsStore.addRow(obj)

      this.resetValidation()

      this.showAlert = true
      this.alertType = 'info'
      this.alertMessage = 'Added successfully'
    },

    filterItems() {
      const carObj = {}
      this.brand && (carObj.brand = this.brand)
      this.year && (carObj.year = this.year)
      this.color && (carObj.color = this.color)
      this.price && (carObj.price = this.price)

      this.carsStore.filterRows(carObj)

      this.carsStore.isFilter = true
    },

    showFavorites() {
      this.$router.push({ name: 'fav' })
    }
  },
}
</script>
