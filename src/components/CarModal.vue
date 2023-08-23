<template>
  <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
    <div class="p-8 mt-12 ml-48 bg-white">
      <img
        :src="carSrc"
        alt="car-image"
        class="w-[60rem] h-[35rem]"
        tabindex="0"
        @blur="closeModal"
        ref="carImage"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarModal',
  props:{
    message: {
      type: String,
      default: 'Brand'
    },
    carSrc: {
      type: String,
      required: true
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  },
  mounted() {
    this.$refs.carImage.focus()
  }
}
</script>
