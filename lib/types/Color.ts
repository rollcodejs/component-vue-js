export type Color = PureColor | GradientColor;
export type PureColor = {
  type: "pure";
  value?: string;
} & ColorBaseItem;

export type GradientColor = {
  type: "gradient";
  gradientType: "linear-gradient" | "radial-gradient";
  deg: number;
  alpha: number;
  valueList?: Array<GradientColorItem>;
};

export type GradientColorItem = {
  percentPlus?: string | number;
  pickerVisible?: boolean;
  inst?: any;
  id?: any;
} & ColorBaseItem;

export type ColorBaseItem = {
  value?: string;
  alpha?: any;
  colorMode?: "hex" | "rgba";
};
