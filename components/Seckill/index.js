export { default } from "./Seckill.vue";

export const meta = {
  name: "Seckill",
  label: "秒杀",
  setters: {
    text: {
      type: "Text",
      label: "秒杀文本",
      default: "距结束",
    },
  },
  actions: [
    {
      label: "开始秒杀",
      name: "startSecKill",
      dataType: "boolean",
    },
  ],
};
