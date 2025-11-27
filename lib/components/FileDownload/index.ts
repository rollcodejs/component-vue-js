import FileDownload from "./FileDownload.vue";

export default FileDownload;

export interface FileDownloadProps {
  resource?: {
    src: string;
    type: "image" | "video" | "audio" | "other";
    size?: number;
  };
  fileName?: string;
}

export const meta = {
  name: "FileDownload",
  author: "roller",
  label: "文件下载",
  setters: {
    resource: {
      type: "Resource",
      label: "文件资源",
    },
    fileName: {
      type: "Text",
      label: "文件名称",
      default: "example.pdf",
    },
  },
} as const;

