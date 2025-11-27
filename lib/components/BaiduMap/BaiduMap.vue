<template>
  <div class="baidu-map-container">
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref, watch } from "vue";

const props = defineProps<{
  lng?: string | number; // 经度
  lat?: string | number; // 纬度
  ak?: string; // 百度地图密钥
  title?: string; // 标记点标题
}>();

const mapContainer = ref<HTMLElement>();
let map: any = null;
let marker: any = null;
let scriptLoaded = false;

// 加载百度地图脚本
const loadBaiduMapScript = (ak: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (scriptLoaded && (window as any).BMap) {
      resolve();
      return;
    }

    // 检查是否已存在脚本
    const existingScript = document.querySelector(
      'script[src*="api.map.baidu.com"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.src = `https://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=initBaiduMap`;
    script.async = true;
    script.defer = true;

    // 定义全局回调函数
    (window as any).initBaiduMap = () => {
      scriptLoaded = true;
      resolve();
    };

    script.onerror = () => {
      reject(new Error("百度地图脚本加载失败"));
    };

    document.head.appendChild(script);
  });
};

// 初始化地图
const initMap = async () => {
  if (!props.ak) {
    console.error("百度地图密钥不能为空");
    return;
  }

  if (!mapContainer.value) {
    return;
  }

  try {
    // 加载百度地图脚本
    await loadBaiduMapScript(props.ak);

    const BMap = (window as any).BMap;
    if (!BMap) {
      console.error("百度地图API未加载成功");
      return;
    }

    // 默认坐标（北京天安门）
    const defaultLng = props.lng ? Number(props.lng) : 116.397428;
    const defaultLat = props.lat ? Number(props.lat) : 39.90923;

    // 创建地图实例
    map = new BMap.Map(mapContainer.value);
    const point = new BMap.Point(defaultLng, defaultLat);
    map.centerAndZoom(point, 15);

    // 启用滚轮缩放
    // map.enableScrollWheelZoom(true);

    // 如果提供了坐标，添加标记点
    if (
      props.lng !== undefined &&
      props.lng !== null &&
      props.lat !== undefined &&
      props.lat !== null
    ) {
      updateMarker();
    }
  } catch (error) {
    console.error("初始化百度地图失败:", error);
  }
};

// 更新标记点
const updateMarker = () => {
  if (
    !map ||
    props.lng === undefined ||
    props.lng === null ||
    props.lat === undefined ||
    props.lat === null
  ) {
    return;
  }

  const BMap = (window as any).BMap;
  if (!BMap) {
    return;
  }

  // 转换坐标类型
  const lng = Number(props.lng);
  const lat = Number(props.lat);

  // 验证坐标有效性
  if (isNaN(lng) || isNaN(lat)) {
    console.warn("经纬度格式不正确");
    return;
  }

  // 移除旧标记
  if (marker) {
    map.removeOverlay(marker);
  }

  // 创建新标记
  const point = new BMap.Point(lng, lat);
  marker = new BMap.Marker(point);

  // 添加标题
  if (props.title) {
    const infoWindow = new BMap.InfoWindow(props.title, {
      width: 200,
      height: 50,
      title: "位置信息",
    });
    marker.addEventListener("click", () => {
      map.openInfoWindow(infoWindow, point);
    });
  }

  map.addOverlay(marker);
  map.centerAndZoom(point, 15);
};

// 监听坐标变化
watch(
  () => [props.lng, props.lat, props.title],
  () => {
    if (map) {
      updateMarker();
    }
  },
  { deep: true }
);

watch(
  () => props.ak,
  () => {
    initMap();
  },
  {
    immediate: true,
  }
);

onBeforeUnmount(() => {
  if (map) {
    map = null;
  }
  if (marker) {
    marker = null;
  }
});
</script>

<style lang="less" scoped>
.baidu-map-container {
  width: 100%;
  height: 100%;
  &:after {
    content: "请先检查配置";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 14px;
    line-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.map-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>
