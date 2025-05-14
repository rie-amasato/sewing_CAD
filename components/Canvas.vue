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
      :viewbox="`0 0 ${svgViewboxSize[0]} ${svgViewboxSize[1]}`"
      stroke-width="3"
      id="idSvgCanvas"
      @touchstart="clickCanvas"
      @touchend="unclickCanvas"
    >
      <path
        v-for="x in arangeX"
        :d="`M 0 ${x} L ${svgViewboxSize[0]} ${x}`"
        stroke="#999"
        stroke-width="2"
        fill="#999"
      ></path>
      <path
        v-for="y in arangeY"
        :d="`M 0 ${y} L ${svgViewboxSize[1]} ${y}`"
        stroke="#999"
        stroke-width="2"
        fill="#999"
      ></path>

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
  moveunit: number;
}>();
const emits = defineEmits();

const svgViewboxSize = ref<number[]>([200, 100]);
const arangeX = ref<number[]>([]);
const arangeY = ref<number[]>([]);

onMounted(() => {
  for (let i = 0; (i += props.moveunit); i < svgViewboxSize.value[0]) {
    arangeX.value.push(i);
  }
  for (let i = 0; (i += props.moveunit); i < svgViewboxSize.value[1]) {
    arangeY.value.push(i);
  }
});

const mkd = (path: TPath): string => {
  return path.commands
    .map((command) => {
      return `${command.attribute} ${command.x} ${command.y}`;
    })
    .join(" ");
};

const isDrag = ref<boolean>(false);
const clickCanvas = (e: any) => {
  e.preventDefault();
  if (e.target.tagName == "circle") {
    emits("select", [e.target.dataset.pi, e.target.dataset.ci]);
  }
};

const unclickCanvas = (e: any) => {
  isDrag.value = false;

  const canvasElm = document.getElementById("idSvgCanvas");
  if (!canvasElm) return;

  const canvasClienRect = canvasElm.getBoundingClientRect();

  const touchY = e.changedTouches[0].clientY - canvasClienRect.top;
  const touchX = e.changedTouches[0].clientX - canvasClienRect.left;

  emits("move", [touchX, touchY]);
};

const log = ref("ろぐ");
</script>
