<template>
  <div class="file-download-component" @click="handleDownload">
    <div class="file-icon">
      <span class="icon">{{ fileIcon }}</span>
    </div>
    <div class="file-info">
      <div class="file-name">{{ displayFileName }}</div>
      <div class="file-meta">
        <span class="file-extension">{{ fileExtension }}</span>
        <span v-if="fileSize" class="file-size">{{ fileSize }}</span>
      </div>
    </div>
    <div class="download-icon">⬇️</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Resource } from "lib/types/Resource";
import { isInEditor } from "lib/utils/isInEditor";
import { useRollCodeProvide } from "lib/hooks/useRollcodeProvide";
import { joinURL } from "ufo";

const props = defineProps<{
  resource?: Resource;
  fileName?: string;
}>();
const rollCodeProvide = useRollCodeProvide();

// 获取文件扩展名
const fileExtension = computed(() => {
  if (!props.fileName) return "";
  const parts = props.fileName.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : "";
});

// 获取文件名（不含扩展名）
const displayFileName = computed(() => {
  if (!props.fileName) return "未命名文件";
  const parts = props.fileName.split(".");
  return parts.length > 1 ? parts.slice(0, -1).join(".") : props.fileName;
});

// 根据扩展名获取图标
const fileIcon = computed(() => {
  const ext = fileExtension.value.toLowerCase();

  const iconMap: Record<string, string> = {
    // 文档类型
    pdf: "📄",
    doc: "📝",
    docx: "📝",
    xls: "📊",
    xlsx: "📊",
    ppt: "📽️",
    pptx: "📽️",
    txt: "📄",
    rtf: "📄",

    // 图片类型
    jpg: "🖼️",
    jpeg: "🖼️",
    png: "🖼️",
    gif: "🖼️",
    bmp: "🖼️",
    svg: "🖼️",
    webp: "🖼️",
    ico: "🖼️",

    // 视频类型
    mp4: "🎬",
    avi: "🎬",
    mov: "🎬",
    wmv: "🎬",
    flv: "🎬",
    mkv: "🎬",
    webm: "🎬",

    // 音频类型
    mp3: "🎵",
    wav: "🎵",
    flac: "🎵",
    aac: "🎵",
    ogg: "🎵",
    wma: "🎵",

    // 压缩文件
    zip: "📦",
    rar: "📦",
    "7z": "📦",
    tar: "📦",
    gz: "📦",

    // 代码文件
    js: "📜",
    ts: "📜",
    html: "🌐",
    css: "🎨",
    json: "📋",
    xml: "📋",

    // 其他
    exe: "⚙️",
    dmg: "💿",
    apk: "📱",
    ipa: "📱",
  };

  return iconMap[ext] || "📎";
});

// 格式化文件大小
const formatFileSize = (bytes?: number): string => {
  if (!bytes || bytes === 0) return "";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// 获取文件大小
const fileSize = computed(() => {
  // 检查Resource是否有size字段（虽然当前类型定义中没有，但可能将来会扩展）
  const resource = props.resource as any;
  if (resource?.size) {
    return formatFileSize(resource.size);
  }
  return "";
});

// 处理下载
const handleDownload = () => {
  if (isInEditor()) return;
  if (!props.resource?.src) return;

  const url = joinURL(
    rollCodeProvide?.value?.storage?.endPoint || "",
    rollCodeProvide?.value?.storage?.bucket || "",
    props.resource.src
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = props.fileName || "download";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style lang="less" scoped>
.file-download-component {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 12px;

  &:hover {
    background: #f5f5f5;
    border-color: #007bff;
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
  }

  .file-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    border-radius: 8px;

    .icon {
      font-size: 24px;
    }
  }

  .file-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .file-name {
      font-size: 14px;
      font-weight: 500;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .file-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #666;

      .file-extension {
        padding: 2px 6px;
        background: #e9ecef;
        border-radius: 4px;
        font-weight: 500;
      }

      .file-size {
        color: #999;
      }
    }
  }

  .download-icon {
    flex-shrink: 0;
    font-size: 20px;
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  &:hover .download-icon {
    opacity: 1;
  }
}
</style>
