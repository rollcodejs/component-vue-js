<template>
  <div
    :style="{
      background: '#dddef4',
    }"
  >
    <!-- 页面/弹窗区域 声明之后该位置即可拖拽组件、配置属性 -->
    <slot name="pageRegion"></slot>
    <slot name="popupRegion"></slot>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
const showToast = () => {
  alert("这是一条信息展示");
};
onMounted(() => {
  console.log("页面挂载完成");
});
defineExpose({
  showToast,
});
</script>
