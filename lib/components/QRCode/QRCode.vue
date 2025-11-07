<template>
  <div class="qrcode-container" :style="containerStyles">
    <canvas ref="canvasRef" :style="styles"></canvas>
    <img
      v-if="logo?.src"
      :src="logoUrl"
      class="qrcode-logo"
      :style="logoStyles"
      alt="logo"
    />
  </div>
</template>

<script setup lang="ts">
import { Length } from "lib/types/Length";
import { Resource } from "lib/types/Resource";
import * as qrcode from "qrcode";
import {
  computed,
  ComputedRef,
  inject,
  nextTick,
  onMounted,
  Ref,
  ref,
  watch,
} from "vue";

const props = defineProps<{
  info?: string;
  logo?: Resource;
  width?: Length;
}>();

const rollcodeProvide =
  inject<ComputedRef<{ storage: { endPoint: string; bucket: string } }>>(
    "ROLLCODE_PROVIDE"
  );

const canvasRef = ref<HTMLCanvasElement | null>(null);

const qrWidth = computed(() => props.width?.value || 200);

const styles = computed(() => {
  return {
    width: qrWidth.value,
    height: qrWidth.value,
  };
});

const containerStyles = computed(() => {
  return {
    width: qrWidth.value,
    height: qrWidth.value,
  };
});

const logoUrl = computed(() => {
  if (!props.logo?.src) return "";
  const { storage } = rollcodeProvide!.value;
  const prefix = storage?.endPoint + "/" + storage?.bucket + "/";
  return prefix + props.logo.src;
});

const logoStyles = computed(() => {
  const logoSize = qrWidth.value * 0.2;
  const size = `${logoSize}px`;
  return {
    width: size,
    height: size,
  };
});

const generateQRCode = async () => {
  if (!canvasRef.value || !props.info) {
    return;
  }

  try {
    const canvas = canvasRef.value;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    // 生成二维码（使用高级别纠错，确保添加 logo 后仍可读）
    await qrcode.toCanvas(canvas, props.info, {
      width: qrWidth.value,
      errorCorrectionLevel: "H", // H 级别可以容忍约 30% 的数据损坏
      margin: 1,
    });

    // 如果有 logo，在 canvas 上绘制白色背景（为 logo 预留空间）
    // 这样二维码库会考虑这个区域，确保不影响扫描
    if (props.logo?.src) {
      const logoSize = qrWidth.value * 0.2;
      const x = (qrWidth.value - logoSize) / 2;
      const y = (qrWidth.value - logoSize) / 2;
      const cornerRadius = logoSize * 0.1;
      const padding = cornerRadius;
      const bgX = x - padding;
      const bgY = y - padding;
      const bgSize = logoSize + padding * 2;

      // 绘制白色背景圆角矩形（为 logo 预留空间）
      ctx.fillStyle = "#FFFFFF";
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(bgX, bgY, bgSize, bgSize, cornerRadius);
        ctx.fill();
      } else {
        // 兼容旧浏览器
        ctx.beginPath();
        ctx.moveTo(bgX + cornerRadius, bgY);
        ctx.arcTo(bgX + bgSize, bgY, bgX + bgSize, bgY + bgSize, cornerRadius);
        ctx.arcTo(bgX + bgSize, bgY + bgSize, bgX, bgY + bgSize, cornerRadius);
        ctx.arcTo(bgX, bgY + bgSize, bgX, bgY, cornerRadius);
        ctx.arcTo(bgX, bgY, bgX + bgSize, bgY, cornerRadius);
        ctx.closePath();
        ctx.fill();
      }
    }
  } catch (error) {
    console.error("生成二维码失败:", error);
  }
};

// 监听属性变化，重新生成二维码
watch(
  () => [props.info, props.logo?.src, props.width?.value],
  () => {
    nextTick(() => {
      generateQRCode();
    });
  },
  { deep: true }
);

onMounted(() => {
  nextTick(() => {
    generateQRCode();
  });
});
</script>

<style lang="less" scoped>
.qrcode-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  >canvas {
    display: block;
    max-width: 100%;
    height: auto;
  }

  .qrcode-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10%;
    padding: 1px;
    box-sizing: border-box;
    pointer-events: none;
    object-fit: contain;
    /* 背景已在 canvas 上绘制，这里不需要再设置 */
  }
}
</style>
