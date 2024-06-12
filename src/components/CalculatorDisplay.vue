<template>
  <div class="display mb-6 mx-2 p-4 bg-gray-500 text-right  text-gray-100 text-2xl object-center font-mono rounded-lg">{{ value }}</div>
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
  height: 60px;

}
</style>
