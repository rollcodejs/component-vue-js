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
    color: {
      type: "Color",
      label: "颜色设置",
    },
    resource: {
      type: "Resource",
      label: "资源",
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
