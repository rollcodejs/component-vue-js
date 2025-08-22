export type Meta = {
  name: string;
  label: string;
  actions: Action[];
  setters: any;
};

export type Action = {
  name: string;
  label: string;
  dataType: "json" | "string" | "boolean" | "number";
};
