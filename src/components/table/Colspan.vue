<script setup lang="ts">
export interface Props {
  class?: string;
  colspan?: string | number;
}

const props = defineProps<Props>();
</script>

<template>
  <tr>
    <td :colspan="props.colspan || 99">
      <div :class="props.class">
        <slot></slot>
      </div>
    </td>
  </tr>
</template>
