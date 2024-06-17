<template>
  <div class="calculator my-6 rounded-xl p-6 bg-gray-900 w-auto h-auto">
    <!-- Usar a propriedade computada para exibir o valor com o operador -->
    <CalculatorDisplay :value="displayValueWithOperator" :class="displayError" />
    <CalculatorMenu @button-click="onButtonClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import CalculatorDisplay from './CalculatorDisplay.vue';
import CalculatorMenu from './CalculatorMenu.vue';
import { Calculator as CalculatorModel } from '../models/calculator';
import { Operations} from '../models/operations';

export default defineComponent({
  name: 'Calculator',
  setup() {
    const calculator = new CalculatorModel(); 
    const displayValue = ref<string>(calculator.getCurrent());
    const errorMessage = ref<string>(calculator.getErrorMessage());
    const currentOperator = ref<Operations | null>(null);
    const previousValue = ref<string>('');

    // Propriedade computada para exibir o valor com o operador se presente
    const displayValueWithOperator = computed(() => {  
      return currentOperator.value ? `${previousValue.value} ${currentOperator.value} ${displayValue.value}` : displayValue.value;
    });
        
    // Função para lidar com cliques nos botões
    const displayError = computed(() => {
      return displayValue.value === 'NaN' ? 'text-red-500' : '';
    });

    watch(() => calculator.getErrorMessage(), (newErrorMessage) => {
      errorMessage.value = newErrorMessage;
    });

    const onButtonClick = (button: string) => {
      if (errorMessage.value) { // Limpar qualquer mensagem de erro existente
        calculator.clearErrorMessage();
        errorMessage.value = '';
      }

      if (!isNaN(parseInt(button))) {
        calculator.inputDigit(button);
        displayValue.value = calculator.getCurrent(); 
      } 
      else if (button === 'C') {
        calculator.clear();
        currentOperator.value = null;
        previousValue.value = '';
        displayValue.value = calculator.getCurrent();
        errorMessage.value = calculator.getErrorMessage();
      } 
      else if (button === '=') {
        calculator.calculate();
        displayValue.value = calculator.getCurrent();
        errorMessage.value = calculator.getErrorMessage();
        currentOperator.value = null;
        previousValue.value = '';
      } 
      else if (['+', '-', 'x', '/'].includes(button)) {
        const operation = button as Operations;
        if(button === '-' && displayValue.value === '0'){
          displayValue.value = '';
        }
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

