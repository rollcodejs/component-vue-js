import BaiduMap from "./BaiduMap.vue";

export default BaiduMap;

export interface BaiduMapProps {
  lng?: number;
  lat?: number;
  ak?: string;
  title?: string;
}

export const meta = {
  name: "BaiduMap",
  label: "百度地图",
  setters: {
    ak: {
      type: "Text",
      label: "百度地图密钥(AK)",
      default: "", // 请根据实际情况填写， 地图会自动加载
    },
    lng: {
      type: "Text",
      label: "经度",
      default: "116.397428",
    },
    lat: {
      type: "Text",
      label: "纬度",
      default: "39.90923",
    },
    title: {
      type: "Text",
      label: "标记点标题",
      default: "地图标记点",
    },
  },
  actions: [],
};
