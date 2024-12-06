<template>
  <section class="calculator my-6 rounded-xl p-6 bg-gray-900 w-[340px] h-auto">
    <CalculatorDisplay :value="displayValueWithOperator" :class="displayError" />
    <CalculatorMenu @button-click="onButtonClick" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Operations } from '../models/Operations';
import { CalculatorController } from '../controllers/CalculatorController';


export default defineComponent({
  name: 'Calculator',
  data() {
    const calculatorController = new CalculatorController();
    return {
      calculatorController,
      displayValue: calculatorController.getCurrent(),
      errorMessage: calculatorController.getErrorMessage(),
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
    errorMessage(newErrorMessage: string): string {
      return this.errorMessage = newErrorMessage;
    }
  },
  methods: {
    onButtonClick(button: string): void {
      if (this.errorMessage) {
        this.calculatorController.clear();
        this.errorMessage = '';
      }
      if (!isNaN(parseInt(button))) {
        this.calculatorController.inputDigit(button);
        this.displayValue = this.calculatorController.getCurrent();
      } else if (button === 'C') {
        this.calculatorController.clear();
        this.currentOperator = null;
        this.previousValue = '';
        this.displayValue = this.calculatorController.getCurrent();
        this.errorMessage = this.calculatorController.getErrorMessage();
      } else if (button === '=') {
        this.calculatorController.calculate();
        this.displayValue = this.calculatorController.getCurrent();
        this.errorMessage = this.calculatorController.getErrorMessage();
        this.currentOperator = null;
        this.previousValue = '';
      } else if (['+', '-', 'x', '/'].includes(button)) {
        const operation = button as Operations;
        if (button === '-' && this.displayValue === '0') {
          this.displayValue = '';
        }
        if (this.displayValue !== 'Operação inválida') {
          if (this.currentOperator) {
            this.calculatorController.calculate();
            this.displayValue = this.calculatorController.getCurrent();
          }
          this.currentOperator = operation;
          this.previousValue = this.displayValue;
          this.calculatorController.inputOperator(operation);
          this.displayValue = '';
        }
        this.errorMessage = this.calculatorController.getErrorMessage();
      }
    }
  }
});
</script>
