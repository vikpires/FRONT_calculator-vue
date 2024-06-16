<template>
  <div class="menu grid grid-cols-4 mx-auto">
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
      const mathOperators = ['+', '-', 'x', '/'];
      return {
        'bg-yellow-500 text-gray-800 hover:bg-yellow-700 active:bg-yellow-700': button === '=',
        'bg-blue-500 text-white hover:bg-blue-800 active:bg-blue-800': mathOperators.includes(button),
        'bg-gray-700 text-white hover:bg-gray-800 active:bg-gray-800': !mathOperators.includes(button),
      };
    },
  }
});
</script>

<style scoped>
.menu {
  gap: 2px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap; 
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
