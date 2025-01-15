<template>
  <div
    :style="{
      background: '#ffffcc',
      borderRadius: '12px',
      width: '100%',
      height: '100vh'
    }"
  >
    <slot name="pageRegion"></slot>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
const props = defineProps({
  text: Object
});
const clickHandler = () => {
  alert('点击了按钮！');
};
</script>
