<template>
  <button 
    @click="$emit('click', label)"
    class="btn p-6 m-1 rounded-lg bg-gray-700 text-white font-bold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" 
    :class="{'col-span-2': label === '0'}">
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CalculatorButton',
  props: {
    label: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
.btn {
  height: 60px;
  width: 60px;
}
</style>
