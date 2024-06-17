<template>
  <div class="calculator my-6 rounded-xl p-6 bg-gray-900 w-auto h-auto">
    <!-- Usar a propriedade computada para exibir o valor com o operador -->
    <CalculatorDisplay :value="displayValueWithOperator" :class="displayError" />
    <CalculatorMenu @button-click="onButtonClick" />
    <div v-if="errorMessage" class="error-message mt-2 text-red-500">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import CalculatorDisplay from './CalculatorDisplay.vue';
import CalculatorMenu from './CalculatorMenu.vue';
import { Calculator as CalculatorModel, Operation } from '../models/calculator';

export default defineComponent({
  name: 'Calculator',
  components: {
    CalculatorDisplay,
    CalculatorMenu,
  },
  setup() {
    const calculator = new CalculatorModel();
    const displayValue = ref<string>(calculator.getCurrent());
    const errorMessage = ref<string>(calculator.getErrorMessage());
    const currentOperator = ref<Operation | null>(null);
    const previousValue = ref<string>('');

    const displayValueWithOperator = computed(() => {
      return currentOperator.value ? `${previousValue.value} ${currentOperator.value} ${displayValue.value}` : displayValue.value;
    });

    const displayError = computed(() => {
      return displayValue.value === 'NaN' ? 'text-red-500' : '';
    });

    watch(() => calculator.getErrorMessage(), (newErrorMessage) => {
      errorMessage.value = newErrorMessage;
    });

    const onButtonClick = (button: string) => {
      if (errorMessage.value) {
        calculator.clearErrorMessage();
        errorMessage.value = '';
      }

      if (!isNaN(parseInt(button))) {
        calculator.inputDigit(button);
        displayValue.value = calculator.getCurrent();
      } else if (button === 'C') {
        calculator.clear();
        currentOperator.value = null;
        previousValue.value = '';
        displayValue.value = calculator.getCurrent();
        errorMessage.value = calculator.getErrorMessage();
      } else if (button === '=') {
        calculator.calculate();
        displayValue.value = calculator.getCurrent();
        errorMessage.value = calculator.getErrorMessage();
        currentOperator.value = null;
        previousValue.value = '';
      } else if (['+', '-', 'x', '/'].includes(button)) {
        const operation = button as Operation;
        if (displayValue.value !== 'NaN') {
          if (currentOperator.value) {
            calculator.calculate();
            displayValue.value = calculator.getCurrent();
          }
          currentOperator.value = operation;
          previousValue.value = displayValue.value;
          calculator.inputOperator(operation);
          displayValue.value = '';
        }
      }
      errorMessage.value = calculator.getErrorMessage();
    };

    return {
      displayValue,
      displayValueWithOperator,
      displayError,
      errorMessage,
      currentOperator,
      onButtonClick,
    };
  },
});
</script>

