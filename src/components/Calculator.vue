<template>
  <div class="calculator mx-auto mt-8 max-w-xs border border-gray-600 rounded-3xl shadow-lg p-5 bg-gray-900">
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
        if(/[0-9]/.test(button)){
          this.calculator.inputDigit(button);
        }else if (button === 'C'){
          this.calculator.clear();
        }else {
          this.calculator.inputOperator(button as Operation);
        }
      } catch (error: any){
        if (error instanceof Error){
          this.errorMessage = error.message;
        }else {
          this.errorMessage = 'Um erro desconhecido ocorreu.'
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
