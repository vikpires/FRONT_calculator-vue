<template>
  <div class="menu grid grid-cols-4 mx-auto w-max overflow-hidden text-ellipsis whitespace-nowrap">
    <CalculatorButton 
      v-for="button in buttons" 
      :key="button" 
      :label="button" 
      :class="buttonClass(button)"  
      @click="onButtonClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Colors } from './MenuService';

export default defineComponent({
  name: 'CalculatorMenu',
  data() {
    return {
      buttons: [
        '1', '2', '3', '/',
        '4', '5', '6', 'x',
        '7', '8', '9', '-', 
        'C', '0', '=', '+',
      ]
    };
  },
  methods: {
    onButtonClick(button: string) {
      this.$emit('button-click', button);
    },
    buttonClass(button: string) {
      const mathOperators = ['+', '-', 'x', '/'];
      const equal = ['='];
      if (equal.includes(button)) {
        return Colors.colorEqual();
      } else if (mathOperators.includes(button)) {
        return Colors.colorOperations();
      } else {
        return Colors.colorDefault();
      }
    },
  }
});
</script>


