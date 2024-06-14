<template>
  <div class="Calculator my-6 rounded-xl p-6 bg-gray-900 w-max">
    <CalculatorDisplay :value="displayValue" />
    <CalculatorMenu @button-click="onButtonClick" />
    <div v-if="errorMessage" class="error-message mt-2 text-red-500">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { Calculator as CalculatorModel, Operation } from '../models/calculator';

export default defineComponent({
  name: 'Calculator',
  setup() {
    const calculator = new CalculatorModel();
    const displayValue = ref<string>(calculator.getCurrent());
    const errorMessage = ref<string>('');
    const currentOperator = ref<Operation | null>(null);    
    
    // // Computed property to display current value with operator if present
    // const displayValueWithOperator = computed(() => {
    //   return currentOperator.value ? `${displayValue.value} ${currentOperator.value}` : displayValue.value;
    // });

    // Function to handle button clicks
    const onButtonClick = (button: string) => {
      errorMessage.value = '';  // Clear any existing error message
      if (!isNaN(parseInt(button))) {
          calculator.inputDigit(button);
        } else if (button === 'C') {
          calculator.clear();
          currentOperator.value = null;
        } else if (button === '=') {
          calculator.calculate();
          currentOperator.value = null;
        } else if (['+', '-', '*', '/'].includes(button)) {
          const operation = button as Operation;
          calculator.inputOperator(operation);
          currentOperator.value = operation;
        } 
        else {
        displayValue.value = calculator.getCurrent();
      } 
        
    };

    return {
      displayValue,
      errorMessage,
      onButtonClick
    };
  }
});
</script>

