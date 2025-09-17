import { Action } from "./Defined";

export type HotRegion = {
  title: string;
  id: string;
  rect: {
    // 以下数值均为宽度的百分比（小数计）
    x: number;
    y: number;
    width: number;
    height: number;
  };
  actions: Action[];
  color: string;
};
