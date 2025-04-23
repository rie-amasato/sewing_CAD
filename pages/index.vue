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
import type { TPath } from "@/components/Canvas.vue";

const svgpaths = ref<TPath[]>([
  {
    commands: [
      { attribute: "M", x: 10, y: 20 },
      { attribute: "L", x: 40, y: 20 },
      { attribute: "L", x:80, y: 40 },
      { attribute: "L", x: 60, y: 80 },
      { attribute: "L", x: 10, y: 20 },
    ],
  },
]);
</script>
