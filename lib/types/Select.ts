export type Select = {
  options: SelectOption[];
  modelValue: SelectOption["value"];
};

type SelectOption = {
  label: string;
  value: string | number | boolean;
};
