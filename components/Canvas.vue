<template>
  canvas
  {{ paths }}
  <svg
    width="200"
    height="100"
    viewbox="0 0 200 100"
    fill="#ffaaaa"
    stroke-width="3"
  >
    <path v-for="path in paths" :d="path" stroke="blue"></path>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  paths: string[];
}>();
</script>
