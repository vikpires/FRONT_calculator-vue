<template>
  <div class="menu grid grid-cols-4 gap-2 mx-auto">
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
import { Operation } from '../models/calculator';

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
      if (button === 'C' || button === '=') {
        this.$emit('button-click', button);
      } else {
        this.$emit('button-click', button as Operation);
      }
    },
    buttonClass(button: string) {
      return {
        'bg-yellow-500 text-gray-900 hover:bg-yellow-800': button === '=',
        'bg-blue-500 text-white hover:bg-blue-800': ['+', '-', 'x', '/'].includes(button),
        'bg-gray-700 text-white hover:bg-gray-800': !['=', '+', '-', 'x', '/'].includes(button),
        'text-white': !['=', '+', '-', 'x', '/'].includes(button),
        'rounded-md p-2 text-2xl': true,
      };
    },
  }
});
</script>

<style scoped>
.menu {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}

.menu .button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* estilos específicos para as classes personalizadas */
.bg-blue-500 {
  background-color: #377ceb; 
}

.bg-blue-800 {
  background-color: #1e40af; /* para hover */
}

/* estilo de hover para classes personalizadas */
.bg-blue-500:hover {
  background-color: #1e40af; /* altera a cor de fundo para azul escuro ao passar o mouse */
}
</style>
