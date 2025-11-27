export type Group = {
  value: Record<string, any>;
  schema: Record<
    string,
    {
      type: string;
      label: string;
    }
  >;
};
