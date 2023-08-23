<template>
  <div>
    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 ">
      <div class="flex flex-col gap-3 p-8 ml-48  bg-white">

        <div class="flex justify-center mb-4">
          <h3 class="text-2xl">{{ message }}</h3>
        </div>

        <div class="h-4 border border-white w-72">
          <CarsAlert
            v-if="showAlert"
            :type="alertType"
            :message="alertMessage"
            class="-mt-1"
          />
        </div>

        <InputBox
          v-model="brand"
          inputName="Brand"
          :stringInput=true
          inputPlaceholder="car brand"
          alt="car-name"
        />

        <InputBox
          v-model="year"
          inputName="Year"
          :stringInput=false
          inputPlaceholder="year"
          :minNumber="1900"
          :maxNumber="2050"
          alt="car-year"
        />

        <InputBox
          v-model="color"
          inputName="Color"
          :stringInput=true
          inputPlaceholder="color"
          alt="car-color"
        />

        <InputBox
          v-model="price"
          inputName="Price"
          :stringInput=false
          inputPlaceholder="price"
          :minNumber="100"
          :maxNumber="100000"
          :stepNumber="100"
          alt="car-price"
        />

        <div class="mt-8">
          <button
            @click="shouldUpdate(true)"
            class="px-12 py-2 mr-12 text-white bg-blue-600 rounded"
          >Update</button>

          <button
            @click="shouldUpdate(false)"
            class="px-12 py-2 text-white bg-red-800 rounded"
          >Cancel</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import InputBox from './InputBox.vue'
import CarsAlert from './CarsAlert.vue';
import { alphanumericAndSingleSpaces } from '../helpers/sanitizer'

export default {
  name: 'UpdateModal',
  components: {
    InputBox,
    CarsAlert
  },
  data() {
    return {
      newBrand: null,
      newYear: null,
      newColor: null,
      newPrice: null,
      showAlert: false,
      alertType: '',
      alertMessage: '',
    };
  },
  props:{
    message: {
      type: String,
      required: true
    },
    carId: {
      type: Number,
      required: true
    },
    carBrand: {
      type: String,
      required: true
    },
    carYear: {
      type: Number,
      required: true
    },
    carColor: {
      type: String,
      required: true
    },
    carPrice: {
      type: Number,
      required: true
    }
  },
  computed: {
    brand: {
      get(){
        return this.carBrand
      },
      set(newBrand){
        return this.newBrand = alphanumericAndSingleSpaces(newBrand)
      }
    },
    year: {
      get(){
        return this.carYear
      },
      set(newYear){
        return this.newYear = newYear
      }
    },
    color: {
      get(){
        return this.carColor
      },
      set(newColor){
        return this.newColor = alphanumericAndSingleSpaces(newColor)
      }
    },
    price: {
      get(){
        return this.carPrice
      },
      set(newPrice){
        return this.newPrice = Number(newPrice)
      }
    }
  },
  methods: {
    displayAlert(type, message) {
      this.showAlert = true
      this.alertType = type
      this.alertMessage = message
    },

    shouldUpdate(shouldUpdate) {
      this.alertMessage = ''

      if (this.newBrand?.length === 0 && typeof this.newBrand === 'string') {
        this.alertMessage = `Please fill in the 'Brand' field`
      }
      else if (this.newYear?.length === 0 && typeof this.newYear === 'string') {
        this.alertMessage = `Please fill in the 'Year' field`
      }
      else if (this.newColor?.length === 0 && typeof this.newColor === 'string') {
        this.alertMessage = `Please fill in the 'Color' field`
      }
      else if (this.newPrice?.length === 0 && typeof this.newPrice === 'string') {
        this.alertMessage = `Please fill in the 'Price' field`
      }

      if (this.alertMessage) {
        return this.displayAlert('error', this.alertMessage)
      }

      const modifiedCar = {
        id: this.carId,
        brand: this.newBrand || this.carBrand,
        year: this.newYear || this.carYear,
        color: this.newColor || this.carColor,
        price: this.newPrice || this.carPrice
      }

      this.$emit('shouldUpdate', shouldUpdate && modifiedCar)
    }
  },
}
</script>
