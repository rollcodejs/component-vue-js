import { Length } from "./Length";
import { Select } from "./Select";

export type ImageSwitcher = {
  defaultImageId: string;
  sync: boolean;
  imageHeight?: Length;
  imageWidth?: Length;
  imageFillMethod?: Select;
};
