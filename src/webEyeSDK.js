import { setConfig } from "./config";
import { lazyReportBatch } from "./report";
import performance from "./performance/index.js";
import behavior from "./behavior/index.js";
import error from "./error/index.js";

window.__webEyeSDK__ = {
  version: "0.0.1",
};

//针对Vue项目的错误捕获
export function install(Vue, options) {
  if (__webEyeSDK__.vue) return;
  __webEyeSDK__.vue = true;
  const handler = Vue.config.errorHandler;

  //vue项目中，通过Vue.config.errorHandler配置全局错误处理函数 捕获错误
  Vue.config.errorHandler = function (err, vm, info) {
    // 上报具体的错误
    const reportData = {
      info,
      error: err.stack,
      subType: 'vue',
      type: 'error',
      startTime: window.performance.now(),
      pageUrl: window.location.href,
    };
    lazyReportBatch(reportData);
    if (handler) {
      handler.call(this, err, vm, info);
    }
  };
}

//针对React项目的错误捕获
export function errorBoundary(err) {
  if (__webEyeSDK__.react) return;
  __webEyeSDK__.react = true;
  // 上报具体的错误
  const reportData = {
    info,
    error: err?.stack,
    subType: 'react',
    type: 'error',
    startTime: window.performance.now(),
    pageUrl: window.location.href,
  }
  lazyReportBatch(reportData);
}

/**
 * 初始化
 * @param {Object} options 配置对象
 */
export function init(options) {
  setConfig(options);
  error();
}

export default {
  install,
  errorBoundary,
  performance,
  behavior,
  error,
  init
};
