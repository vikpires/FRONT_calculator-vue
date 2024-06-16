<template>
  <button 
    class="btn p-4 m-1 rounded-xl font-semibold text-2xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 h-18 w-16 active:scale-90 object-center" 
    @click="$emit('click', label)">
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'calculator-button',
  props: {
    label: {
      type: String,
      required: true
    }
  }
});
</script>

