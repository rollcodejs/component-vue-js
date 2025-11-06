import { Color } from "./Color";
import { CustomEnum } from "./CustomEnum";
import { Group } from "./Group";
import { Resource } from "./Resource";
import { Time } from "./Time";
import { Select } from "./Select";
import { Switch } from "./Switch";
import { Text } from "./Text";
import { Length } from "./Length";

export type Meta = {
  name: string;
  label: string;
  actions: Action[];
  setters: Record<string, Setter>;
  stylesSetters?: Record<
    string,
    {
      type: ALlSettersTypeName;
      label: string;
      default: AllSettersType;
    }
  >;
};

type AllSettersType =
  | Text
  | Date
  | Time
  | Group
  | GroupArray
  | Resource
  | Color
  | Switch
  | Select
  | CustomEnum
  | Length;

type ALlSettersTypeName =
  | "Text"
  | "Date"
  | "Group"
  | "GroupArray"
  | "Resource"
  | "Color"
  | "Switch"
  | "Select"
  | "CustomEnum"
  | "Length";

type Setter = {
  type: ALlSettersTypeName;
  label: string;
  default?: AllSettersType;
};

export type Action = {
  name: string;
  label: string;
  dataType: "json" | "string" | "boolean" | "number";
};

export type GroupArray = {
  value: any[];
  schema: Record<
    string,
    {
      type: string;
      label: string;
    }
  >;
};
