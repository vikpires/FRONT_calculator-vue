<template>
    <div class="display mb-4 p-4 bg-gray-100 text-right text-2xl font-mono">{{ value }}</div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'CalculatorDisplay',
    props: {
      value: {
        type: String,
        required: true
      }
    }
  });
  </script>
  
  <style scoped>
  .display {
    height: 40px;
    line-height: 40px;
  }
  </style>
  