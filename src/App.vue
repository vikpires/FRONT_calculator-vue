<template>
  <main class="app-container min-h-screen flex flex-col items-center justify-center bg-gray-200">
    <Calculator />
    <Footer />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>

<style>
@import './styles/index.css';
</style>
