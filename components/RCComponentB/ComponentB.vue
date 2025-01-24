<template>
  <div>
    <p>这是ComponentB组件！</p>
    <button @click="clickHandler">点击按钮测试</button>
    <span>我组件B测试值在这里:{{ props.text }}</span>
  </div>
</template>
<script setup>
const props = defineProps({
  text: Object
});
const clickHandler = () => {
  alert('点击了按钮！');
};
defineExpose({
  asd(){
    console.log('你看我导出了什么');
    return '哈哈哈'
  }
})
</script>
