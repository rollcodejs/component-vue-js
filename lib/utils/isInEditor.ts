declare global {
  interface Window {
    __ROLLCODE_ENV?: "EDITOR" | "PREVIEW" | "LIVE_PREVIEW" | "ONLINE" | "NONE";
  }
}

export const isInEditor = () => {
  /**
   *  必须判断window是否可用，否则generate时报错
   *  */
  return typeof window === "undefined"
    ? false
    : window.__ROLLCODE_ENV === "EDITOR";
};
