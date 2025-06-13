<template>
  <button class="buttonComponent">{{ props.text }} | {{ randomText }}</button>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  text: String,
});
const randomText = ref("");

defineExpose({
  randomText: () => {
    randomText.value = Math.random().toString(36).substring(2, 15);
  },
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
