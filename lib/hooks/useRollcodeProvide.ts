import { inject, ComputedRef } from "vue";

export const useRollCodeProvide = () => {
  return inject<ComputedRef<{ storage: { endPoint: string; bucket: string } }>>(
    "ROLLCODE_PROVIDE"
  );
};
