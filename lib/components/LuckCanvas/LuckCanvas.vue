<template>
  <div v-if="isEnd">
    <div class="end-date">
      <span>活动已结束</span>
    </div>
  </div>
  <LuckyWheel
    v-else
    ref="myLucky"
    width="375px"
    height="375px"
    :prizes="formattedPrizes"
    :blocks="blocks"
    :buttons="buttons"
    @start="startCallback"
    @end="endCallback"
  />
</template>
<script>
import { LuckyWheel } from "@lucky-canvas/vue";
import dayjs from "dayjs/esm";

export default {
  components: {
    LuckyWheel,
  },
  inject: {
    rollcodeProvide: {
      from: "ROLLCODE_PROVIDE",
      default: () => {},
    },
  },
  props: {
    prizes: {
      type: Object,
      default: () => {},
    },
    endDate: {
      type: Object,
    },
  },
  computed: {
    isEnd() {
      if (!this.endDate) return false;
      const date = dayjs(this.endDate.modelValue).endOf("day");
      return dayjs().isAfter(date);
    },
    formattedPrizes() {
      return this.prizes?.value.map((p) => {
        const { storage } = this.rollcodeProvide;
        const prefix = storage.endPoint + "/" + storage.bucket + "/";
        return {
          fonts: [{ text: p.name, top: "10%" }],
          imgs: [
            {
              src: p.img.src ? prefix + p.img.src : undefined,
              width: 60,
              height: 100,
            },
          ],
        };
      });
    },
  },
  data() {
    return {
      blocks: [{ padding: "13px", background: "#617df2" }],
      buttons: [
        { radius: "40%", background: "#617df2" },
        { radius: "35%", background: "#afc8ff" },
        {
          radius: "30%",
          background: "#869cfa",
          pointer: true,
          fonts: [{ text: "开始", top: "-10px" }],
        },
      ],
    };
  },
  methods: {
    // 点击抽奖按钮会触发star回调
    startCallback() {
      // 调用抽奖组件的play方法开始游戏
      this.$refs.myLucky.play();
      // 模拟调用接口异步抽奖, 实际中需要换成用户的抽奖接口
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        const index = 0;
        // 调用stop停止旋转并传递中奖索引
        this.$refs.myLucky.stop(index);
      }, 3000);
    },
    // 抽奖结束会触发end回调
    endCallback(prize) {
      console.log(prize);
    },
  },
};
</script>
<style scoped>
.end-date {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 20px;
  font-weight: bold;
}
</style>
