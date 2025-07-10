<template>
  <div class="lottery-page">
    <div class="lottery">
      <div class="lottery-prize">
        <div class="box-1">
          <div class="img" v-for="item in renderPrizeList(prize1BoxCount)">
            <img :src="item.img" alt="" />
          </div>
        </div>
        <div class="box-2">
          <div class="img" v-for="item in renderPrizeList(prize2BoxCount)">
            <img :src="item.img" alt="" />
          </div>
        </div>
        <div class="box-3">
          <div class="img" v-for="item in renderPrizeList(prize3BoxCount)">
            <img :src="item.img" alt="" />
          </div>
        </div>
      </div>

      <div class="lottery-btn">
        <img
          v-if="!buttonActive"
          @click="startLottery"
          src="./assets/button-0.png"
          alt=""
        />
        <img v-else src="./assets/button-1.png" alt="" />
      </div>

      <div class="lottery-footer">
        <p class="lottery-time">活动时间 2025.06.18-2025.11.11</p>
        <p class="lottery-rule">可前往活动规则查看详情</p>
      </div>
    </div>

    <div class="popup" v-if="popupVisible">
      <div class="content" v-if="!opened" @click="openPrize">
        <img class="prize-img" :src="selectedPrize.img" alt="" />
      </div>
      <div
        v-if="opened"
        @click="popupVisible = false"
        class="content opened"
      ></div>
    </div>

    <slot name="pageRegion"></slot>
    <slot name="popupRegion"></slot>
  </div>
</template>

<script setup>
import animate from "animejs";
import { ref } from "vue";
import prize1Image from "./assets/prize1.png";
import prize2Image from "./assets/prize2.png";
import prize3Image from "./assets/prize3.png";
const PRIZE_LIST = [
  {
    name: "prize1",
    img: prize1Image,
  },
  {
    name: "prize2",
    img: prize2Image,
  },
  {
    name: "prize3",
    img: prize3Image,
  },
];
const isRunning = ref(false);
const popupVisible = ref(false);
const buttonActive = ref(false);
const opened = ref(false);
const selectedPrize = ref(null);
const renderPrizeList = (count) => {
  const list = [];
  for (let i = 0; i < count + 1; i++) {
    list.push(...PRIZE_LIST);
  }
  return list;
};

const prize1BoxCount = ref(1);
const prize2BoxCount = ref(1);
const prize3BoxCount = ref(1);

const randomBoxCount = () => Math.floor(Math.random() * 10) + 4;
const startLottery = (action) => {
  console.log("prams:", action);
  if (isRunning.value) return;
  isRunning.value = true;
  buttonActive.value = true;
  setTimeout(() => {
    buttonActive.value = false;
  }, 200);
  const randomPrizeIndex = Math.floor(Math.random() * PRIZE_LIST.length);
  selectedPrize.value = PRIZE_LIST[randomPrizeIndex];
  const boxHeight = 118; // 每个奖品的高度
  const groupBoxHeight = boxHeight * 3;
  const offsetHeight = randomPrizeIndex * boxHeight;
  prize1BoxCount.value = randomBoxCount();
  prize2BoxCount.value = randomBoxCount();
  prize3BoxCount.value = randomBoxCount();

  // 为三个box设置不同的滚动距离和速度
  const boxConfigs = [
    {
      selector: ".box-1",
      distance: prize1BoxCount.value * groupBoxHeight + offsetHeight,
      duration: 7000,
      delay: 0,
    },
    {
      selector: ".box-2",
      distance: prize2BoxCount.value * groupBoxHeight + offsetHeight,
      duration: 7000,
      delay: 200,
    },
    {
      selector: ".box-3",
      distance: prize3BoxCount.value * groupBoxHeight + offsetHeight,
      duration: 7000,
      delay: 400,
    },
  ];

  const boxElements = document.querySelectorAll(
    ".lottery-prize .box-1, .lottery-prize .box-2, .lottery-prize .box-3"
  );
  boxElements.forEach((element) => {
    element.style.transform = "translateY(0)";
  });
  opened.value = false;

  boxConfigs.forEach((config, index) => {
    animate({
      targets: config.selector,
      translateY: -config.distance,
      duration: config.duration,
      delay: config.delay,
      easing: "easeOutCubic",
      complete: function (anim) {
        // 动画完成后的回调
        console.log(
          `Box ${index + 1} 动画完成，显示奖品: ${selectedPrize.name}`
        );
        isRunning.value = false;
        popupVisible.value = true;
      },
    });
  });
};

const openPrize = () => {
  opened.value = true;
};

defineExpose({
  lottery: startLottery,
});
</script>

<style scoped lang="less">
.lottery {
  width: 100%;
  height: 504px;
  background: url("./assets/poster.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .lottery-prize {
    display: flex;
    position: absolute;
    top: 258px;
    gap: 20px;
    overflow: hidden;
    justify-content: space-between;
    margin: 0 auto;
    width: 100%;
    left: 0;
    padding: 0 45px;
    .box-1,
    .box-2,
    .box-3 {
      width: 85px;
      height: 118px;
      .img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          display: block;
        }
      }
    }
  }
  .lottery-btn {
    position: absolute;
    top: 395px;
    left: 50%;
    transform: translateX(-50%);
    width: 219px;
    display: flex;
    align-items: flex-end;
    height: 61px;
    img {
      width: 100%;
      display: block;
    }
  }
  .lottery-time {
    font-size: 12px;
    color: #a66b07;
    text-align: center;
  }
  .lottery-rule {
    font-size: 12px;
    color: #a66b07;
    text-align: center;
  }
  .lottery-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 4px;
    p {
      margin: 0;
    }
  }
}
.popup {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .content {
    background-image: url("./assets/popup.png");
    &.opened {
      background-image: url("./assets/popup-opened.png");
    }
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 282px;
    height: 276px;
    .prize-img {
      width: 88px;
      display: block;
      margin: 0 auto;
      margin-top: 80px;
    }
  }
}
</style>
