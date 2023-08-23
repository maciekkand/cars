<template>
  <div alt="pagination">
    <label class="mt-2 mr-4">Select number of rows per page </label>
    <select
      v-model="rowsNumber"
      @change="changePagination"
      class="text-black rounded w-18 form-select"
      alt="select-rows-per-page"
    >
      <option>10</option>
      <option>20</option>
      <option>50</option>
      <option>100</option>
    </select>

    <button
      href="#"
      @click="prevPage"
      class="mt-2 ml-8 font-semibold text-blue-600 underline"
      alt="previous-page-button"
    >Prev</button>

    <button
      href="#"
      @click="nextPage"
      class="mt-2 ml-12 font-semibold text-blue-600 underline"
      alt="next-page-button"
    >Next</button>

  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      rowsNumber: 10,
      pageStart: 0,
    }
  },
  computed: {
    rowStart() {
      return this.pageStart * this.rowsNumber
    }
  },
  methods: {
    returnPagination() {
      this.$emit('newPagination', { start: this.rowStart, limit: +this.rowsNumber })
    },

    nextPage() {
      this.pageStart = ++this.pageStart
      this.returnPagination()
    },

    prevPage() {
      this.pageStart && --this.pageStart
      this.returnPagination()
    },

    changePagination() {
       this.pageStart = 0
       this.returnPagination()
    }
  },
}
</script>
