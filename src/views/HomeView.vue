<template>
  <div>
    <main class="flex flex-col xl:flex-row xl:justify-center">
      <section>
        <CarsForm alt="add-car-form"/>
      </section>
      <section>
        <CarsTable alt="cars-table"/>
      </section>
    </main>
  </div>
</template>

<script>
import CarsTable from '../components/CarsTable.vue';
import CarsForm from '../components/CarsForm.vue';

export default {
  components: {
    CarsTable,
    CarsForm,
  },
}
</script>

