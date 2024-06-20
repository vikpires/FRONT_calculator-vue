<template>
  <div class="display my-8 mx-1 p-2 bg-gray-300 text-right text-gray-800 text-4xl rounded-xl h-28 object-center relative w-[285px] text-ellipsis overflow-hidden whitespace-nowrap flex items-center justify-end ">
    <span class="value p-[5px] text-ellipsis whitespace-break-spaces">{{ value }}</span>
    <span v-if="shouldShowCursor" class="absolute right-2 m-auto bg-gray-700 inline-block w-[2px] h-[52px] custom-blink"></span>
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
    return props.value !== '0' && props.value !== 'Operação inválida';
    });
    return {
      shouldShowCursor
    };
  }
});
</script>

Excluir após incluir no tailwind
<style scoped>
.custom-blink {
  animation: custom-blink 1s infinite; /* Animação de piscar */
}

@keyframes custom-blink {
  0%, 50% {
    opacity: 0; /* Começa invisível */
  }
  51%, 100% {
    opacity: 1; /* Fica visível */
  }
}
</style>