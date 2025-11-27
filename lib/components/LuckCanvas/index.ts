import { Meta } from "lib/types/Defined";
import LuckCanvas from "./LuckCanvas.vue";

export default LuckCanvas;

export const meta: Meta = {
  name: "LuckCanvas",
  label: "幸运抽奖",
  setters: {
    endDate: {
      type: "Date",
      label: "结束时间",
    },
    prizes: {
      type: "GroupArray",
      label: "奖品",
      default: {
        value: [],
        schema: {
          name: {
            type: "Text",
            label: "奖品名称",
          },
          img: {
            type: "Resource",
            label: "奖品图片",
          },
        },
      },
    },
  },
  actions: [],
} as const;
