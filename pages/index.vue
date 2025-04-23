<template>
  <Menubar />
  <div class="container red grid">
    <div class="container white s1 e4">
      <Canvas :paths="svgpaths" />
    </div>
    <div class="container white s4 e5">要素りすと</div>
  </div>
</template>

<script setup lang="ts">
const svgpaths = ref<string[]>([
  "M 5 10 L 10 15 L 20 10 L 5 10",
  "M 5 20 L 10 35 L 90 15 L 20 100 L 5 20",
]);
</script>
