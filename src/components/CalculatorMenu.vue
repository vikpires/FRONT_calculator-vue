<template>
  <div class="menu grid grid-cols-4 gap-2 mx-auto">
    <CalculatorButton 
      v-for="button in buttons" 
      :key="button" 
      :label="button" 
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
        '4', '5', '6', '*',
        '7', '8', '9', '-', 
        'C', '0', '=', '+',
      ]
    };
  },
  methods: {
    onButtonClick(button: string) {
      if(button === 'C' || button === '='){
        this.$emit('button-click', button);
      }else{
      this.$emit('button-click', button as Operation);
    }
  }
}
});
</script>
<style scoped>
.menu {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}
</style>