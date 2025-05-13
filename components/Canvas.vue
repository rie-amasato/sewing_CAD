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
      id="idSvgCanvas"
      @touchstart="clickCanvas"
      @touchend="unclickCanvas"
    >
      <template v-for="(path, pi) in paths">
        <path :d="mkd(path)" stroke="blue" fill="#ccc"></path>
        <template v-for="(command, ci) in path.commands">
          <circle
            :data-pi="pi"
            :data-ci="ci"
            :cx="command.x"
            :cy="command.y"
            r="6"
            :fill="command.selected ? '#F00' : '#555'"
          ></circle>
        </template>
      </template>
    </svg>
  </div>
  <div class="container violet">
    {{ log }}<br />
    isDrag: {{ isDrag ? "True" : "False" }}
  </div>
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
const emits = defineEmits();

const mkd = (path: TPath): string => {
  return path.commands
    .map((command) => {
      return `${command.attribute} ${command.x} ${command.y}`;
    })
    .join(" ");
};

const isDrag = ref<boolean>(false);
const clickCanvas = (e: any) => {
  if (e.target.tagName == "circle") {
    emits("select", [e.target.dataset.pi, e.target.dataset.ci]);
  }
};

const unclickCanvas = (e: any) => {
  isDrag.value = false;

  const canvasElm = document
    .getElementById("idSvgCanvas")
    .getBoundingClientRect();

  const touchY = e.changedTouches[0].clientY - canvasElm.top;
  const touchX = e.changedTouches[0].clientX - canvasElm.left;

  emits("move", [touchX, touchY]);
};

const log = ref("ろぐ");
</script>
