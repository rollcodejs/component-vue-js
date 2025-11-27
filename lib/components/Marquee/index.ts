import { Meta } from "lib/types/Defined";
import Marquee from "./Marquee.vue";

export default Marquee;

import { GroupArray } from "lib/types/GroupArray";
import { Select } from "lib/types/Select";
import { Text } from "lib/types/Text";

export interface MarqueeProps {
  items?: GroupArray;
  direction?: Select;
  theme?: Select;
  speed?: Text;
}

export const meta: Meta = {
  name: "Marquee",
  label: "文字跑马灯",
  setters: {
    items: {
      type: "GroupArray",
      label: "文字列表",
      default: {
        value: [
          { text: "欢迎使用跑马灯组件" },
          { text: "这是一个示例文字" },
          { text: "可以自定义文字列表" },
        ],
        schema: {
          text: {
            type: "Text",
            label: "文字内容",
          },
        },
      },
    },
    direction: {
      type: "Select",
      label: "滚动方向",
      default: {
        value: "horizontal",
        options: [
          { label: "左右", value: "horizontal" },
          { label: "上下", value: "vertical" },
        ],
      },
    },
    theme: {
      type: "Select",
      label: "主题风格",
      default: {
        value: "dark",
        options: [
          { label: "黑色", value: "dark" },
          { label: "白色", value: "light" },
        ],
      },
    },
    speed: {
      type: "Text",
      label: "滚动速度",
      default: "50",
    },
  },
  stylesSetters: {
    height: {
      type: "Length",
      label: "高度",
      default: {
        value: 40,
        unit: "none",
      },
    },
  },
  actions: [],
} as const;
