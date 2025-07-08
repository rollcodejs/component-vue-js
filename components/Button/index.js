export { default } from "./Button.vue";

export const meta = {
  name: "Button",
  author: "roller",
  label: "按钮",
  setters: {
    text: {
      type: "Text",
      label: "按钮文本",
      default: "Hello World! 👋🏻",
    },
    resource: {
      type: "Resource",
      label: "资源",
    },
    textColor: {
      type: "Color",
      label: "文本颜色",
    }
  },
  actions: [
    {
      label: "播放动画",
      name: "playAnimation",
    },
  ],
};
