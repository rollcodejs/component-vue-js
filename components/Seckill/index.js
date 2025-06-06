export { default } from "./Seckill.vue";

export const meta = {
  name: "Seckill",
  author: "roller",
  label: "秒杀",
  setters: {
    text: {
      type: "Text",
      label: "秒杀文本",
      default: "距结束",
    },
    // text: {
    //   type: "Date",
    //   label: "秒杀日期",
    //   default: "2025-05-30",
    // },
  },
  actions: [],
};
