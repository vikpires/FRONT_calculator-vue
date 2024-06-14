<template>
  <div class="display my-6 mx-1 p-4 bg-gray-300 text-right  text-gray-800 text-4xl rounded-xl h-20 whitespace-nowrap overflow-hidden content-center">
    {{ value }}
    <span class="cursor-blink"></span>
    </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue';

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
