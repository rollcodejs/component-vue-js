<template>
  <div>
    <p>这是ComponentExample组件</p>
    <p>测试文本属性：{{ props.text }}</p>
    <button @click="clickHandler">点击按钮测试</button>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
const props = defineProps({
  // 这里的属性对应meta中setters的key， 类型根据meta中setters的type来确定
  text: String,
});
onMounted(() => {
  console.log("组件挂载完成");
});
const clickHandler = () => {
  alert("点击了按钮！");
};

// 这里可以自定义对外暴露的方法，同样也需要在 meta 中定义 actions
defineExpose({
  exposeName: clickHandler,
});
</script>
