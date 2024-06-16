<template>
  <div class="calculator my-6 rounded-xl p-6 bg-gray-900 w-max">
    <!-- Usar a propriedade computada para exibir o valor com o operador -->
    <CalculatorDisplay :value="displayValueWithOperator" />
    <CalculatorMenu @button-click="onButtonClick" />
    <div v-if="errorMessage" class="error-message mt-2 text-red-500">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import CalculatorDisplay from './CalculatorDisplay.vue';
import CalculatorMenu from './CalculatorMenu.vue';
import { Calculator as CalculatorModel, Operation } from '../models/calculator';

export default defineComponent({
  name: 'Calculator',
  setup() {
    const calculator = new CalculatorModel();
    const displayValue = ref<string>(calculator.getCurrent());
    const errorMessage = ref<string>('');
    const currentOperator = ref<Operation | null>(null);
    const previousValue = ref<string>(''); // Armazena o valor anterior

    // Propriedade computada para exibir o valor com o operador se presente
    const displayValueWithOperator = computed(() => {
      return currentOperator.value ? `${previousValue.value} ${currentOperator.value} ${displayValue.value}` : displayValue.value;
    });

    // Função para lidar com cliques nos botões
    const onButtonClick = (button: string) => {
      errorMessage.value = '';  // Limpar qualquer mensagem de erro existente

      if (!isNaN(parseInt(button))) {
        calculator.inputDigit(button);
        displayValue.value = calculator.getCurrent();
      } else if (button === 'C') {
        calculator.clear();
        currentOperator.value = null;
        previousValue.value = '';
        displayValue.value = calculator.getCurrent();
      } else if (button === '=') {
        calculator.calculate();
        displayValue.value = calculator.getCurrent();
        currentOperator.value = null;
        previousValue.value = '';

      } else if (['+', '-', 'x', '/'].includes(button)) {
        if(button === '-' && displayValue.value === '0'){
          displayValue.value = '';
        }
        const operation = button as Operation;
        if (currentOperator.value) { //é ativa se o operador nao for null
          calculator.calculate();
          displayValue.value = calculator.getCurrent(); //atualiza a operação caso seja iniciaoo outra

        }
        currentOperator.value = operation;
        previousValue.value = displayValue.value;
        calculator.inputOperator(operation);
        displayValue.value = '';
      }
    };

    return {
      displayValue,
      displayValueWithOperator,
      errorMessage,
      currentOperator,
      onButtonClick
    };
  }
});
</script>

<style scoped>
.operator-display {
  text-align: right;
  font-size: 2rem;
  color: #888;
  margin-right: 1rem;
}
</style>

