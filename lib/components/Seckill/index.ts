import { Meta } from "lib/types/Defined";
import Seckill from "./Seckill.vue";

export default Seckill;

export const meta: Meta = {
  name: "Seckill",
  label: "秒杀",
  setters: {
    endDate: {
      type: "Date",
      label: "结束日期",
    },
    endTime: {
      type: "Time",
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
} as const;
