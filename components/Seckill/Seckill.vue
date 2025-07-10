<template>
  <div class="seckill">
    <div class="seckill-countdown">
      <span class="seckill-countdown-unit">{{ text }}</span>
      <span class="seckill-countdown-box">{{ days }}</span
      ><span class="seckill-countdown-unit">天</span>
      <span class="seckill-countdown-box">{{ hours }}</span
      ><span class="seckill-countdown-unit">时</span>
      <span class="seckill-countdown-box">{{ minutes }}</span
      ><span class="seckill-countdown-unit">分</span>
      <span class="seckill-countdown-box">{{ seconds }}</span
      ><span class="seckill-countdown-unit">秒</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  text: String,
});
import { ref, onMounted, onUnmounted } from "vue";

const now = new Date();
const END_DATE = now.toISOString().split("T")[0];
const END_TIME = "23:59:59";
const endTime = new Date(`${END_DATE}T${END_TIME}`);

const days = ref("00");
const hours = ref("00");
const minutes = ref("00");
const seconds = ref("00");
let timer = null;

function updateCountdown() {
  const now = new Date();
  let diff = Math.max(0, endTime - now);
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= d * 1000 * 60 * 60 * 24;
  const h = Math.floor(diff / (1000 * 60 * 60));
  diff -= h * 1000 * 60 * 60;
  const m = Math.floor(diff / (1000 * 60));
  diff -= m * 1000 * 60;
  const s = Math.floor(diff / 1000);
  days.value = String(d).padStart(2, "0");
  hours.value = String(h).padStart(2, "0");
  minutes.value = String(m).padStart(2, "0");
  seconds.value = String(s).padStart(2, "0");
}

onMounted(() => {
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
});
onUnmounted(() => {
  if (timer) clearInterval(timer);
});

defineExpose({
  startSecKill: (action) => {
    console.log("params:", action);
  },
});
</script>
<style scoped>
.seckill {
  background: url("./assets/secskill.png") no-repeat center center;
  background-size: 100% auto;
  padding: 16px 0;
  width: 100%;
  height: 140px;
  padding-top: 24%;
}
.seckill-countdown-label {
  color: #fff;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 16px;
  letter-spacing: 2px;
}
.seckill-countdown {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
}
.seckill-countdown-box {
  display: inline-block;
  min-width: 28px;
  height: 28px;
  background: #fff;
  color: #ff4d4f;
  font-size: 14px;
  border-radius: 8px;
  text-align: center;
  line-height: 28px;
  margin: 0 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
.seckill-countdown-unit {
  color: #fff;
  font-size: 16px;
}
</style>
