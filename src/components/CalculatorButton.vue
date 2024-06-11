<template>
    <button 
      @click="$emit('click', label)"
      class="btn p-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
      :class="{'col-span-2': label === '=' || label === 'C'}">
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
    height: 40px;
  }
  </style>
  