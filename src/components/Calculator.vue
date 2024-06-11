<template>
  <div class="calculator mx-auto mt-10 max-w-xs border border-gray-300 rounded-lg shadow-lg p-5 bg-white">
    <CalculatorDisplay :value="calculator.getCurrent()" />
    <CalculatorMenu @button-click="handleButtonClick" />
    <div v-if="errorMessage" class="error-message text-red-500 mt-2">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Calculator as CalculatorModel, Operation } from '../models/calculator';
import CalculatorDisplay from './CalculatorDisplay.vue';
import CalculatorMenu from './CalculatorMenu.vue';

export default defineComponent({
  name: 'Calculator',
  components: {
    CalculatorDisplay,
    CalculatorMenu
  },
  data() {
    return {
      calculator: new CalculatorModel(),
      errorMessage: ''
    };
  },
  methods: {
    handleButtonClick(button: string) {
      this.errorMessage = '';  // Clear any existing error message
      try {
        if (button >= '0' && button <= '9') {
          this.calculator.inputDigit(button);
        } else if (button === 'C') {
          this.calculator.clear();
        } else if (button === '=') {
          this.calculator.calculate();
        } else {
          this.calculator.inputOperator(button as Operation);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = 'Um erro desconhecido ocorreu.';
        }
      }
    }
  }
});
</script>

<style scoped>
.calculator {
  width: 320px;
}
.error-message {
  color: red;
}
</style>
