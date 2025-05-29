<template>
  <button>{{ props.text }}</button>
</template>
<script setup>
const props = defineProps({
  text: String,
});
</script>
<style lang="less" scoped>
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
