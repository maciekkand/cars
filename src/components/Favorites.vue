<template>
  <div>
    <router-link
      to="/"
      exact
      class="flex justify-center my-2 font-semibold text-blue-500 underline"
    >Return</router-link>

    <header>
      <h1 class="hidden text-3xl font-semibold xl:flex xl:justify-center xl:my-6">Selected Cars</h1>
    </header>

    <div class="grid grid-cols-4 gap-4">
      <div v-for="(car, ix) in carsStore.favorites" :key="ix">
        <Card
          :id="car.id"
          :brand="car.brand"
          :year="Number(car.year)"
          :price="Number(car.price)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useCarsStore } from '../stores/carsStore'
import Card from '../components/Card.vue'

export default {
  name: 'Favorites',
  setup() {
    const carsStore = useCarsStore()
    return { carsStore }
  },
  components: {
    Card
  }
}
</script>
