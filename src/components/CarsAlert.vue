<template>
  <div>
    <div
      :class="alertType"
      role="alert"
      alt="alert-message"
    >
      <span class="text-base font-medium">{{ message }}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CarsAlert',
  props:{
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  computed: {
    alertType() {
      const fixedStyles = 'text-sm rounded-lg'
      return this.type === 'error' ? `${fixedStyles} text-red-800` : `${fixedStyles} text-blue-800`
    }
  }
}
</script>
