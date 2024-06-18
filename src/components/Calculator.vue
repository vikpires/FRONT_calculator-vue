<template>
  <div class="calculator my-6 rounded-xl p-6 bg-gray-900 w-auto h-auto">
    <!-- Usar a propriedade computada para exibir o valor com o operador -->
    <CalculatorDisplay :value="displayValueWithOperator" :class="displayError" />
    <CalculatorMenu @button-click="onButtonClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Calculator as CalculatorModel } from '../models/calculator';
import { Operations} from '../models/operations';

export default defineComponent({
  name: 'Calculator',
  data() {
    const calculator = new CalculatorModel();
    return {
      calculator,
      displayValue: calculator.getCurrent(),
      errorMessage: calculator.getErrorMessage(),
      currentOperator: null as Operations | null,
      previousValue: '',
    };
  },
  computed: {
    displayValueWithOperator(): string {
      return this.currentOperator
        ? `${this.previousValue} ${this.currentOperator} ${this.displayValue}`
        : this.displayValue;
    },
    displayError(): string {
      return this.displayValue === 'Operação inválida' ? 'text-red-500 text-[30px]' : '';
    }
  },
  watch: {
    errorMessage(newErrorMessage: string) {
      this.errorMessage = newErrorMessage;
    }
  },
  methods: {
    onButtonClick(button: string) {
      if (this.errorMessage) {
        this.calculator.clearErrorMessage();
        this.errorMessage = '';
      }

      if (!isNaN(parseInt(button))) {
        this.calculator.inputDigit(button);
        this.displayValue = this.calculator.getCurrent();
      } else if (button === 'C') {
        this.calculator.clear();
        this.currentOperator = null;
        this.previousValue = '';
        this.displayValue = this.calculator.getCurrent();
        this.errorMessage = this.calculator.getErrorMessage();
      } else if (button === '=') {
        this.calculator.calculate();
        this.displayValue = this.calculator.getCurrent();
        this.errorMessage = this.calculator.getErrorMessage();
        this.currentOperator = null;
        this.previousValue = '';
      } else if (['+', '-', 'x', '/'].includes(button)) {
        const operation = button as Operations;
        if (button === '-' && this.displayValue === '0') {
          this.displayValue = '';
        }
        if (this.displayValue !== 'Operação inválida') {
          if (this.currentOperator) {
            this.calculator.calculate();
            this.displayValue = this.calculator.getCurrent();
          }
          this.currentOperator = operation;
          this.previousValue = this.displayValue;
          this.calculator.inputOperator(operation);
          this.displayValue = '';
        }
      }
      this.errorMessage = this.calculator.getErrorMessage();
    }
  }
});
</script>

