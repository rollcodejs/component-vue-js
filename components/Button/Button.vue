<template>
  <button class="buttonComponent" :class="{ scale: isScale }">
    <span :style="{ color: props.textColor.value }">{{ props.text }}</span>
    <img :src="imageUrl" alt="" />
  </button>
</template>
<script setup>
import { computed, ref } from "vue";
const props = defineProps({
  text: String,
  resource: Object,
  textColor: Object,
});
const isScale = ref(false);

const imageUrl = computed(() => {
  return 'http://localhost:9000/rollcode' +  props.resource.src;
});

const playAnimation = () => {
  isScale.value = true;
  setTimeout(() => {
    isScale.value = false;
  }, 1000);
};
defineExpose({
  playAnimation,
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
  display: flex;
  align-items: center;
  justify-content: center;
  &.scale {
    animation: scale 1s ease-in-out;
  }
  span {
    font-weight: bold;
  }
  img {
    width: 40px;
    margin-left: 10px;
  }
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
