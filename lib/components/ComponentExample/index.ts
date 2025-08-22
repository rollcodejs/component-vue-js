import type { Meta } from "lib/types/Defined";
import ComponentExample from "./ComponentExample.vue";

export default ComponentExample;

export const meta: Meta = {
  name: "ComponentExample",
  label: "组件示例",
  setters: {
    text: {
      type: "Text",
      label: "测试文本属性",
      default: "这是我测试值",
    },
  },
  actions: [
    {
      label: "仅展示的A行为",
      name: "exposeName",
      dataType: "boolean",
    },
  ],
} as const;
