<template>
  <div>
    <p>这是ComponentA组件！!!</p>
    <p>测试文本属性：{{ props.text }}</p>
    <img src="./demo.png" alt="" />
    <button @click="clickHandler">点击按钮测试</button>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
onMounted(() => {
  console.log(123123);
});
const props = defineProps({
  text: Object,
});
const clickHandler = () => {
  alert("点击了按钮！");
};

defineExpose({
  actionHandler: () => {
    alert("actionHandler");
  },
});
</script>
