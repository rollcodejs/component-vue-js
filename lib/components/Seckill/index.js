export { default } from "./Seckill.vue";

export const meta = {
  name: "Seckill",
  label: "秒杀",
  setters: {
    endTime: {
      type: "Text",
      label: "结束时间",
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
