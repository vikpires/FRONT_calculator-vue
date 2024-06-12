<template>
  <div class="menu grid-cols-4 gap-2">
    <CalculatorButton 
      v-for="button in buttons" 
      :key="button" 
      :label="button" 
      @click="onButtonClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalculatorButton from './CalculatorButton.vue';
import { Operation } from '../models/calculator';

export default defineComponent({
  name: 'CalculatorMenu',
  components: {
    CalculatorButton
  },
  data() {
    return {
      buttons: [
        '1', '2', '3', Operation.Divide,
        '4', '5', '6', Operation.Multiply,
        '7', '8', '9', Operation.Subtract, 
        'C', '0', '=', Operation.Add,
      ]
    };
  },
  computed: {

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
<!-- <style scoped>
.menu {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}
</style> -->