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
  },
  actions: [
    {
      label: "仅展示的A行为",
      name: "randomText",
      dataType: "string",
    },
  ],
};
