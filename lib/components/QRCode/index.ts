import QRCode from "./QRCode.vue";

export default QRCode;

export interface QRCodeProps {
  info?: string;
  logo?: { src: string; type: "image" | "video" | "audio" | "other" };
  width?: { value: number; unit: "none" | "vw" | "vh" | "%" | "auto" };
}

export const meta = {
  name: "QRCode",
  author: "roller",
  label: "二维码",
  setters: {
    info: {
      type: "Text",
      label: "二维码信息",
      default: "https://example.com",
    },
    logo: {
      type: "Resource",
      label: "Logo 图片",
    },
    width: {
      type: "Length",
      label: "二维码宽度",
      default: { value: 200, unit: "none" },
    },
  },
} as const;

