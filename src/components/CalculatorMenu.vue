<template>
  <div class="menu mb-4">
    <CalculatorButton 
      v-for="button in buttons" 
      :key="button" 
      :label="button" 
      @click="onButtonClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalculatorButton from './CalculatorButton.vue';

export default defineComponent({
  name: 'CalculatorMenu',
  components: {
    CalculatorButton
  },
  data() {
    return {
      buttons: [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', 'C', '=', '+'
      ]
    };
  },
  methods: {
    onButtonClick(button: string) {
      this.$emit('button-click', button);
    }
  }
});
</script>
