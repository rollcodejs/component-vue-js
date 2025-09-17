export type Resource = {
  src: string;
  type: "image" | "video" | "audio" | "other";
  native?: {
    width: number;
    height: number;
  };
  rect?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};
