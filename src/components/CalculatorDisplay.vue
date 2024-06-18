<template>
  <div class="display my-8 mx-1 p-2 bg-gray-300 text-right text-gray-800 text-4xl rounded-xl h-28 object-center relative">
    <span class="value p-[5px] text-ellipsis whitespace-break-spaces">{{ value }}</span>
    <span v-if="shouldShowCursor" class="cursor-blink absolute right-2 m-auto bg-gray-700"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed} from 'vue';

export default defineComponent({
  name: 'CalculatorDisplay',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const shouldShowCursor = computed(() => {
    // Mostra o cursor piscante se o valor for diferente de '0' 
    return props.value !== '0' && props.value !== 'NaN';
    });
    return {
      shouldShowCursor
    };
  }
});
</script>
<style scoped>
.display {
  max-width:285px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap; 
  position: relative;
  display: flex;
  align-items: center; /* Centraliza verticalmente */
  justify-content: right; /* Centraliza horizontalmente */
}

.cursor-blink {
  display: inline-block;
  width: 2px; /* Largura do cursor */
  height: 52px; /* Altura do cursor */
  animation: blink 1s infinite; /* Animação de piscar */
}

@keyframes blink {
  0%, 50% {
    opacity: 0; /* Começa invisível */
  }
  51%, 100% {
    opacity: 1; /* Fica visível */
  }
}
</style>