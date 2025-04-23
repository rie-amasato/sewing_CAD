<style scoped>
.svgCanvas {
  border: solid 1px var(--amasugar-violet);
  border-radius: 8px;

  width: 100%;
  height: 150px;

  background-color: "#fee";
}
</style>

<template>
  <div class="svgCanvas">
    <svg
      width="100%"
      height="100%"
      viewbox="0 0 200 100"
      stroke-width="3"
      @click="clickCanvas"
    >
      <template v-for="path in paths">
        <path :d="mkd(path)" stroke="blue" fill="#ccc"></path>
        <template v-for="command in path.commands">
          <circle
            :cx="command.x"
            :cy="command.y"
            r="4"
            :fill="command.selected ? '#F00' : '#555'"
          ></circle>
        </template>
      </template>
    </svg>
  </div>
  <div class="container violet">{{ log }}</div>
</template>

<script setup lang="ts">
export type TPath = {
  commands: {
    attribute: "" | "M" | "L" | "Q";
    x: number;
    y: number;
    selected?: boolean;
  }[];
};

const props = defineProps<{
  paths: TPath[];
}>();

const mkd = (path: TPath): string => {
  return path.commands
    .map((command) => {
      return `${command.attribute} ${command.x} ${command.y}`;
    })
    .join(" ");
};

const clickCanvas = (e: any) => {
  log.value = `x: ${e.offsetX}, y: ${e.offsetY}`;
};

const log = ref("ろぐ");
</script>
