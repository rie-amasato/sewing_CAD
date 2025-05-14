<template>
  <Menubar />
  <div class="container red grid">
    <div class="container white s1 e4">
      <Canvas
        :paths="svgpaths"
        :moveunit="moveunit"
        @select="canvasSelect"
        @move="canvasMove"
      />
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
      { attribute: "L", x: 80, y: 40 },
      { attribute: "L", x: 60, y: 80 },
      { attribute: "L", x: 10, y: 20 },
    ],
  },
]);

const canvasSelect = (num: number[]) => {
  svgpaths.value[num[0]].commands[num[1]].selected = true;
};

const moveunit = ref<number>(10);
const canvasMove = (position: number[]) => {
  svgpaths.value.forEach((path) => {
    path.commands.forEach((command) => {
      if (command.selected) {
        command.selected = false;

        const modx = position[0] % moveunit.value;
        if (modx < moveunit.value / 2) command.x = position[0] - modx;
        else command.x = position[0] - modx + moveunit.value;

        const mody = position[1] % moveunit.value;
        if (mody < moveunit.value / 2) command.y = position[1] - mody;
        else command.y = position[1] - mody + moveunit.value;
      }
    });
  });
};
</script>
