<template>
  <div class="menu grid grid-cols-4 mx-auto w-max">
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
  computed: {
    colorOperations(){
      const colorBlue =  'bg-[#377ceb] text-white hover:bg-[#1c40b4] active:bg-[#1c40b4]';
    return colorBlue;
    }

  },
  methods: {
    onButtonClick(button: string) {
      this.$emit('button-click', button);
    },
    buttonClass(button: string) {
      const mathOperators = ['+', '-', 'x', '/'];
      const equal = ['='];
      return {
        'bg-yellow-500 text-gray-700 hover:bg-yellow-700 active:bg-yellow-700': equal.includes(button),
        [this.colorOperations]: mathOperators.includes(button),
        'bg-gray-700 text-white hover:bg-gray-800 active:bg-gray-800': !mathOperators.includes(button) && !equal.includes(button)
      };
    },
  }
});
</script>

<!-- Excluir após incluir no tailwind -->
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

</style>
