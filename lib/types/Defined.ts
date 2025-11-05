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
    | "CustomEnum";
  label: string;
  default?: any;
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
