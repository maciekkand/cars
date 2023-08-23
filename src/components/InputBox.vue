<template>
  <div>
    <span class="text-black">{{ inputName }}</span>

      <input
        :type="inputBoxType"
        :class="boxWidth"
        :placeholder="`${inputPlaceholder}`"
        :value="value"
        maxlength="20"
        :min="minNumber"
        :max="maxNumber"
        :step="stepNumber"
        @input="$emit('input', $event.target.value)"
      />

  </div>
</template>

<script>

export default {
  name: 'InputBox',
  props:{
    inputName: {
      type: String,
      required: true
    },
    stringInput: {
      type: Boolean,
      default: false
    },
    inputPlaceholder: {
      type: String,
      default: 'default placeholder'
    },
    value: {
      type: String | Number,
      required: false
    },
    minNumber: {
      type: Number,
      required: false
    },
    maxNumber: {
      type: Number,
      required: false
    },
    stepNumber: {
      type: Number,
      required: false
    },
  },
  computed: {
    boxWidth() {
      const fixedStyles = 'block mt-1 border-1 rounded-lg form-input'
      return this.stringInput ? `${fixedStyles} w-[170px]` : `${fixedStyles} w-[95px]`
    },

    inputBoxType() {
      return this.stringInput ? 'text' : 'number'
    },
  },
}
</script>
