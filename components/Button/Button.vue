<template>
  <button class="buttonComponent">{{ props.text }}</button>
</template>
<script setup>
const props = defineProps({
  text: String,
});
</script>
<style lang="less" scoped>
.buttonComponent {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  width: 100%;
}
</style>
