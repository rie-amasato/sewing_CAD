<template>
  <div class="container white flex-2">
    <div v-for="button in buttons" class="button">
      {{ button.label }}
    </div>
  </div>
</template>

<style scoped>
.flex-2 {
  display: flex;
  gap: 8px;
}

.button {
  padding: 4px 8px;

  background-color: #ffeeff;

  border: 1px dashed black;
  border-radius: 4px;
}
</style>

<script setup lang="ts">
const buttons = ref<{ label: string; action: string }[]>([
  { label: "開く", action: "open" },
  { label: "保存", action: "save" },
  { label: "pdf出力", action: "export" },
  { label: "直線", action: "line" },
  { label: "カービング", action: "curving" },
  { label: "頂点マージ", action: "merge" },
  { label: "頂点分離", action: "purge" },
]);
</script>
