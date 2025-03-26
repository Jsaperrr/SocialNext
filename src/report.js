import config from "./config";
import { generateUniqueId } from "./utils";
import { getCache, addCache, clearCache } from "./cache";
export const originalProto = XMLHttpRequest.prototype;
export const originalOpen = XMLHttpRequest.prototype.open;
export const originalSend = XMLHttpRequest.prototype.send;

/**
 * 判断是否支持sendBeacon
 * @returns
 */
export function isSupportSendBeacon() {
  return "sendBeacon" in navigator;
}

/**
 * 上报数据
 * @param {*} data
 */
export function report(data) {
  if (!config.url) {
    console.error("请先配置上报地址");
  }
  const reportData = JSON.stringify({
    id: generateUniqueId(),
    data,
  });
  // 如果配置了图片上传，则使用图片上传
  if (config.isImageUpload) {
    imgRequest(reportData);
  } else {
    // 如果支持sendBeacon，则使用sendBeacon发送
    if (window.navigator.sendBeacon) {
      return beaconRequest(reportData);
    } else {
      // 如果sendBeacon发送失败，则使用ajax发送
      xhrRequest(reportData);
    }
  }
}

/**
 * 批量上报
 * @param {*} data
 */
export function lazyReportBatch(data) {
  addCache(data);
  const dataCache = getCache();
  console.error("dataCache", dataCache);
  if (dataCache.length && dataCache.length > config.batchSize) {
    report(dataCache);
    clearCache();
  }
}

//发送图片数据
export function imgRequest(data) {
  const img = new Image();
  //http://127.0.0.1:8080/api?data=encodeURIComponent(JSON.stringify(data))
  img.src = `${config.url}?data=${encodeURIComponent(JSON.stringify(data))}`;
}

//普通ajax发送请求数据
export function xhrRequest(url, data) {
  if (window.requestIdleCallback) {
    //指定在浏览器空闲时期执行
    window.requestIdleCallback(
      () => {
        const xhr = new XMLHttpRequest();
        originalOpen.call(xhr, "post", url);
        originalSend.call(xhr, JSON.stringify(data));
      },
      { timeout: 3000 }
    );
  } else {
    setTimeout(() => {
      const xhr = new XMLHttpRequest();
      originalOpen.call(xhr, "post", url);
      originalSend.call(xhr, JSON.stringify(data));
    });
  }
}

//sendBeacon发送数据
//const sendBeacon = isSupportSendBeacon() ? navigator.sendBeacon : xhrRequest;
export function beaconRequest(data) {
  if (window.requestIdleCallback) {
    //指定在浏览器空闲时期执行
    window.requestIdleCallback(
      () => {
        window.navigator.sendBeacon(config.url, data);
      },
      { timeout: 3000 }
    );
  } else {
    setTimeout(() => {
      window.navigator.sendBeacon(config.url, data);
    });
  }
}
