<template>
  <div
    class="marquee-container"
    :class="[`marquee-${directionValue}`, `marquee-theme-${themeValue}`]"
    :style="containerStyle"
  >
    <div
      class="marquee-content"
      :class="`marquee-${directionValue}`"
      :style="contentStyle"
    >
      <div
        v-for="(item, index) in displayItems"
        :key="`${item}-${index}`"
        :ref="(el) => { if (index === 0 && el) firstItemRef = el as HTMLElement }"
        class="marquee-item"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { Select } from "lib/types/Select";
import { GroupArray } from "lib/types/GroupArray";
import { Text } from "lib/types/Text";

const props = defineProps<{
  items?: GroupArray;
  direction?: Select;
  theme?: Select;
  speed?: Text;
}>();

// 默认值
const defaultItems = [
  "欢迎使用跑马灯组件",
  "这是一个示例文字",
  "可以自定义文字列表",
];

// 处理文字列表
const itemsList = computed(() => {
  if (
    props.items?.value &&
    Array.isArray(props.items.value) &&
    props.items.value.length > 0
  ) {
    return props.items.value
      .map((item: any) => item.text || String(item))
      .filter(Boolean);
  }
  return defaultItems;
});

// 处理方向
const directionValue = computed(() => {
  if (props.direction?.modelValue !== undefined) {
    return props.direction.modelValue;
  }
  return "horizontal";
});

// 处理主题
const themeValue = computed(() => {
  if (props.theme?.modelValue !== undefined) {
    return props.theme.modelValue;
  }
  return "dark";
});

// 处理速度
const speedValue = computed(() => {
  const speed = props.speed ? Number(props.speed) : 50;
  return isNaN(speed) || speed <= 0 ? 50 : speed;
});

// 为了无缝循环，需要复制内容
const displayItems = computed(() => {
  return [...itemsList.value, ...itemsList.value];
});

// 动画相关
const translateValue = ref(0);
let animationId: number | null = null;
const itemWidth = ref(0);
const itemHeight = ref(0);
const firstItemRef = ref<HTMLElement | null>(null);

// 容器样式
const containerStyle = computed(() => {
  if (directionValue.value === "horizontal") {
    return {
      overflow: "hidden",
    };
  } else {
    return {
      width: "100%",
      overflow: "hidden",
    };
  }
});

// 内容样式
const contentStyle = computed(() => {
  if (directionValue.value === "horizontal") {
    const totalWidth = itemWidth.value * itemsList.value.length;
    return {
      transform: `translateX(-${translateValue.value}px)`,
      width: `${totalWidth * 2}px`,
      display: "flex" as const,
    };
  } else {
    const totalHeight = itemHeight.value * itemsList.value.length;
    return {
      transform: `translateY(-${translateValue.value}px)`,
      height: `${totalHeight * 2}px`,
      display: "flex" as const,
      flexDirection: "column" as const,
    };
  }
});

function startAnimation() {
  if (directionValue.value === "horizontal") {
    const totalWidth = itemWidth.value * itemsList.value.length;
    const animate = () => {
      // 根据速度调整移动步长，速度越大移动越快
      const step = Math.max(0.5, speedValue.value / 50);
      translateValue.value += step;
      if (translateValue.value >= totalWidth) {
        translateValue.value = 0;
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();
  } else {
    const totalHeight = itemHeight.value * itemsList.value.length;
    const animate = () => {
      // 根据速度调整移动步长，速度越大移动越快
      const step = Math.max(0.5, speedValue.value / 50);
      translateValue.value += step;
      if (translateValue.value >= totalHeight) {
        translateValue.value = 0;
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();
  }
}

function stopAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

const initAnimation = () => {
  // 等待DOM渲染后获取尺寸
  if (firstItemRef.value) {
    if (directionValue.value === "horizontal") {
      itemWidth.value = firstItemRef.value.getBoundingClientRect().width + 40; // 加上间距
    } else {
      itemHeight.value = firstItemRef.value.getBoundingClientRect().height + 20; // 加上间距
    }
    if (itemWidth.value > 0 || itemHeight.value > 0) {
      startAnimation();
    }
  }
};

onMounted(() => {
  // 使用nextTick确保DOM已渲染
  setTimeout(() => {
    initAnimation();
  }, 100);
});

onUnmounted(() => {
  stopAnimation();
});

// 监听props变化，重新启动动画
const restartAnimation = () => {
  stopAnimation();
  translateValue.value = 0;
  itemWidth.value = 0;
  itemHeight.value = 0;
  setTimeout(() => {
    initAnimation();
  }, 100);
};

// 监听props变化，重新启动动画
watch([() => props.items, () => props.direction, () => props.theme], () => {
  restartAnimation();
});
</script>

<style scoped lang="less">
.marquee-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.marquee-content {
  will-change: transform;
  height: 100%;
}

.marquee-item {
  white-space: nowrap;
  flex-shrink: 0;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 水平方向
.marquee-horizontal {
  .marquee-content {
    align-items: center;
  }
  .marquee-item {
    height: 100%;
  }
}

// 垂直方向
.marquee-vertical {
  .marquee-content {
    justify-content: center;
  }
  .marquee-item {
    width: 100%;
    padding: 10px 0;
  }
}

// 主题样式
.marquee-theme-dark {
  background: #1a1a1a;
  color: #ffffff;

  .marquee-item {
    color: #ffffff;
    font-size: 14px;
  }
}

.marquee-theme-light {
  background: #ffffff;
  color: #333333;
  border: 1px solid #e0e0e0;

  .marquee-item {
    color: #333333;
    font-size: 14px;
  }
}
</style>
