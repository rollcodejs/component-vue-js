import { Color } from "./Color";
import { CustomEnum } from "./CustomEnum";
import { Group } from "./Group";
import { Resource } from "./Resource";
import { Time } from "./Time";
import { Select } from "./Select";
import { Switch } from "./Switch";
import { Text } from "./Text";

export type Meta = {
  name: string;
  label: string;
  actions: Action[];
  setters: Record<string, Setter>;
};

type Setter = {
  type:
    | "Text"
    | "Date"
    | "Group"
    | "GroupArray"
    | "Resource"
    | "Color"
    | "Switch"
    | "Select"
    | "CustomEnum"
    | "Date"
    | "Time";
  label: string;
  default?:
    | Text
    | Date
    | Time
    | Group
    | GroupArray
    | Resource
    | Color
    | Switch
    | Select
    | CustomEnum;
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
