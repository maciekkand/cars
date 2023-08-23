<template>
  <div>
    <CarModal
      v-if="showModal"
      :message="brand"
      alt="car-big-photo-modal"
      :carSrc="carSrc"
      @closeModal="closeModal"
    />

    <div class="max-w-sm ml-8 overflow-hidden border shadow-lg border-slate-300 rounded-xl">
      <img
        @click="carModal(carId)"
        class="w-full h-[200px]"
        :src="carSrc"
        alt="car-image"
      >

      <div class="px-6 py-3">
        <div class="mb-3 -mt-4 text-xl font-bold uppercase">{{ brand }}</div>

        <p class="text-base text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
        </p>
      </div>

      <div class="px-6 pt-4 pb-2 lg:flex lg:justify-between">
        <span class="inline-block px-2 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-300 rounded-full">Id: {{ id }} </span>

        <span class="inline-block px-2 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-300 rounded-full">Year: {{ year }}</span>

        <span class="inline-block px-2 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-300 rounded-full">${{ price && price.toLocaleString() }}</span>
      </div>

    </div>

  </div>
</template>

<script>
import CarModal from './CarModal.vue'

export default {
  name: 'Card',
  components: {
    CarModal
  },
  props:{
    id: {
      type: Number,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showModal: false,
      carId: ''
    }
  },
  computed: {
    carSrc() {
      return `src/assets/cars/${this.brand}.png`
    },
  },
  methods: {
    carModal() {
      this.showModal = true
    },

    closeModal() {
      this.showModal = false
    }
  },
}
</script>
