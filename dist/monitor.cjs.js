'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = {
  url: '',
  //上报url地址
  projectName: 'eyesdk',
  //项目名称
  appId: '123456',
  //应用id
  userId: '123456',
  //用户id
  isImageUpload: false,
  //是否开启图片上传
  batchSize: 2 //批量上报数量
};

/**
 * 设置配置
 * @param {Object} options 配置对象
 */
function setConfig(options) {
  for (var key in config) {
    if (options[key]) {
      config[key] = options[key];
    }
  }
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

/**
 * 深拷贝
 * @param {*} target 
 * @returns 
 */
function deepCopy(target) {
  if (_typeof(target) === 'object') {
    var result = Array.isArray(target) ? [] : {};
    for (var key in target) {
      if (_typeof(target[key]) === 'object') {
        result[key] = deepCopy(target[key]);
      } else {
        result[key] = target[key];
      }
    }
    return result;
  }
  return target;
}

/**
 * 生成唯一id
 * @returns 
 */
function generateUniqueId() {
  return "id-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9);
}

var cache = [];
function getCache() {
  return deepCopy(cache);
}
function addCache(data) {
  cache.push(data);
}
function clearCache() {
  cache.length = 0;
}

var originalOpen$1 = XMLHttpRequest.prototype.open;
var originalSend$1 = XMLHttpRequest.prototype.send;

/**
 * 上报数据
 * @param {*} data
 */
function report(data) {
  if (!config.url) {
    console.error("请先配置上报地址");
  }
  var reportData = JSON.stringify({
    id: generateUniqueId(),
    data: data
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
function lazyReportBatch(data) {
  addCache(data);
  var dataCache = getCache();
  console.error("dataCache", dataCache);
  if (dataCache.length && dataCache.length > config.batchSize) {
    report(dataCache);
    clearCache();
  }
}

//发送图片数据
function imgRequest(data) {
  var img = new Image();
  //http://127.0.0.1:8080/api?data=encodeURIComponent(JSON.stringify(data))
  img.src = "".concat(config.url, "?data=").concat(encodeURIComponent(JSON.stringify(data)));
}

//普通ajax发送请求数据
function xhrRequest(url, data) {
  if (window.requestIdleCallback) {
    //指定在浏览器空闲时期执行
    window.requestIdleCallback(function () {
      var xhr = new XMLHttpRequest();
      originalOpen$1.call(xhr, "post", url);
      originalSend$1.call(xhr, JSON.stringify(data));
    }, {
      timeout: 3000
    });
  } else {
    setTimeout(function () {
      var xhr = new XMLHttpRequest();
      originalOpen$1.call(xhr, "post", url);
      originalSend$1.call(xhr, JSON.stringify(data));
    });
  }
}

//sendBeacon发送数据
//const sendBeacon = isSupportSendBeacon() ? navigator.sendBeacon : xhrRequest;
function beaconRequest(data) {
  if (window.requestIdleCallback) {
    //指定在浏览器空闲时期执行
    window.requestIdleCallback(function () {
      window.navigator.sendBeacon(config.url, data);
    }, {
      timeout: 3000
    });
  } else {
    setTimeout(function () {
      window.navigator.sendBeacon(config.url, data);
    });
  }
}

/**
 * 重写fetch
 */
var originalFetch = window.fetch;
function overwriteFetch() {
  window.fetch = function newFetch(url, config) {
    var startTime = Date.now();
    var reportData = {
      type: "performance",
      subType: "fetch",
      url: url,
      startTime: startTime,
      method: config.method
    };
    return originalFetch(url, config).then(function (res) {
      var endTime = Date.now();
      reportData.endTime = endTime;
      reportData.duration = endTime - startTime;
      var data = res.clone();
      reportData.status = data.status;
      reportData.success = data.ok;
      //上报数据
      lazyReportBatch(reportData);
      return res;
    }).catch(function (err) {
      var endTime = Date.now();
      reportData.endTime = endTime;
      reportData.duration = endTime - startTime;
      reportData.status = 0;
      reportData.success = false;
      //上报数据
      lazyReportBatch(reportData);
    });
  };
}

/**
 * 监听fetch
 */
function fetch() {
  overwriteFetch();
}

/**
 * 监听页面所有资源加载
 */
function observerEntries() {
  if (document.readyState === "complete") {
    observerEvent();
  } else {
    var _onload = function onload() {
      observerEvent();
      window.removeEventListener("load", _onload, true);
    };
    window.addEventListener("load", _onload, true);
  }
}
function observerEvent() {
  var entryHandler = function entryHandler(list) {
    var data = list.getEntries();
    var _iterator = _createForOfIteratorHelper(data),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var entry = _step.value;
        if (observer) {
          observer.disconnect();
        }
        var reportData = {
          name: entry.name,
          //资源的名称
          type: "performance",
          //类型
          subType: entry.entryType,
          //子类型
          sourceType: entry.initiatorType,
          //资源类型
          duration: entry.duration,
          //加载时间
          dns: entry.domainLookupEnd - entry.domainLookupStart,
          //DNS解析时间
          tcp: entry.connectEnd - entry.connectStart,
          //TCP连接时间
          redirect: entry.redirectEnd - entry.redirectStart,
          //重定向时间
          ttfb: entry.responseStart,
          //首字节时间
          protocol: entry.nextHopProtocol,
          //请求协议
          responseBodySize: entry.encodedBodySize,
          //响应体大小
          responseHeaderSize: entry.transferSize - entry.encodedBodySize,
          //响应头大小
          transferSize: entry.transferSize,
          //请求内容大小
          resourceSize: entry.decodedBodySize,
          //资源解压后大小
          startTime: performance.now() //开始时间
        };
        //上报数据
        lazyReportBatch(reportData);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  /**
   * 页面所有资源加载
   */
  var observer = new PerformanceObserver(entryHandler);
  observer.observe({
    type: ["resource"],
    buffered: true
  });
}

function observerFCP() {
  var entryHandler = function entryHandler(list) {
    var _iterator = _createForOfIteratorHelper(list.getEntries()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var entry = _step.value;
        if (entry.name === "first-contentful-paint") {
          observer.disconnect();
          var json = entry.toJSON();
          console.log(json);
          var reportData = _objectSpread2(_objectSpread2({}, json), {}, {
            type: "performance",
            subType: entry.name,
            pageUrl: window.location.href
          });
          //上报数据
          lazyReportBatch(reportData);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  /**
   * 统计和计算FCP的时间
   */
  var observer = new PerformanceObserver(entryHandler);
  //buffered:true 表示在页面加载完成后，仍然可以获取到FP的时间
  observer.observe({
    type: "paint",
    buffered: true
  });
}

var entryHandler = function entryHandler(list) {
  if (observer) {
    observer.disconnect();
  }
  var _iterator = _createForOfIteratorHelper(list.getEntries()),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var entry = _step.value;
      var json = entry.toJSON();
      console.log(json);
      var reportData = _objectSpread2(_objectSpread2({}, json), {}, {
        type: "performance",
        subType: entry.name,
        pageUrl: window.location.href
      });
      //上报数据
      lazyReportBatch(reportData);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

/**
 * 统计和计算LCP的时间
 */
// 添加默认导出函数
function observerLCP() {
  var observer = new PerformanceObserver(entryHandler);
  //buffered:true 表示在页面加载完成后，仍然可以获取到FP的时间
  observer.observe({
    type: ["largest-contentful-paint"],
    buffered: true
  });
}

/**
 * 监听页面加载
 */
function observerLoad() {
  window.addEventListener("pageShow", function (event) {
    requestAnimationFrame(function () {
      ["load"].forEach(function (type) {
        var reportData = {
          type: "performance",
          subType: type,
          pageUrl: window.location.href,
          startTime: performance.now() - event.timeStamp
        };
        //上报数据
        lazyReportBatch(reportData);
      });
    }, true);
  });
}

/**
 * 监听页面绘制
 */
function observerPaint() {
  var entryHandler = function entryHandler(list) {
    var _iterator = _createForOfIteratorHelper(list.getEntries()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var entry = _step.value;
        if (entry.name === "first-paint") {
          observer.disconnect();
          var json = entry.toJSON();
          console.log(json);
          var reportData = _objectSpread2(_objectSpread2({}, json), {}, {
            type: "performance",
            subType: entry.name,
            pageUrl: window.location.href
          });
          //上报数据
          lazyReportBatch(reportData);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  /**
   * 统计和计算FP的时间
   */
  var observer = new PerformanceObserver(entryHandler);
  //buffered:true 表示在页面加载完成后，仍然可以获取到FP的时间
  observer.observe({
    type: "paint",
    buffered: true
  });
}

/**
 * 重写XMLHttpRequest
 */
var originalProto = XMLHttpRequest.prototype;
var originalSend = originalProto.send;
var originalOpen = originalProto.open;
function overwriteOpenAndSend() {
  originalProto.open = function newOpen() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    this.url = args[1];
    this.method = args[0];
    originalOpen.apply(this, args);
  };
  originalProto.send = function newSend() {
    var _this = this;
    this.startTime = Date.now();
    var _onLoaded = function onLoaded() {
      _this.endTime = Date.now();
      _this.duration = _this.endTime - _this.startTime;
      var url = _this.url,
        method = _this.method,
        startTime = _this.startTime,
        endTime = _this.endTime,
        duration = _this.duration,
        status = _this.status;
      var reportData = {
        status: status,
        url: url,
        startTime: startTime,
        endTime: endTime,
        duration: duration,
        method: method.toUpperCase(),
        type: 'performance',
        success: status >= 200 && status < 300,
        subType: 'xhr'
      };
      //上报数据
      lazyReportBatch(reportData);
      _this.removeEventListener('loadend', _onLoaded, true);
    };
    this.addEventListener('loadend', _onLoaded, true);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    originalSend.apply(this, args);
  };
}

/**
 * 监听XMLHttpRequest
 */
function xhr() {
  overwriteOpenAndSend();
}

/**
 * 性能监控
 */
function performance$1() {
  fetch();
  observerEntries();
  observerFCP();
  observerLCP();
  observerLoad();
  observerPaint();
  xhr();
}

/**
 * 监听点击事件
 */
function onClick() {
  ["mousedown", "touchstart"].forEach(function (eventType) {
    window.addEventListener(eventType, function (e) {
      var target = e.target;
      if (target.tagName) {
        var reportData = {
          //scrollTop: document.documentElement.scrollTop,
          type: "behavior",
          subType: "click",
          uuid: generateUniqueId(),
          startTime: e.timeStamp,
          target: target.tagName,
          innerHTML: target.innerHTML,
          outerHTML: target.outerHTML,
          width: target.offsetWidth,
          height: target.offsetHeight,
          eventType: eventType,
          path: e.path
        };
        lazyReportBatch(reportData);
      }
    });
  });
}

/**
 * 监听页面切换
 */
function pageChange() {
  //hash or history 两种路由模式

  /**
   * hash 模式
   */
  var oldUrl = "";
  window.addEventListener("hashchange", function (event) {
    var newUrl = event.newURL;
    var reportData = {
      from: oldUrl,
      to: newUrl,
      type: "behavior",
      subType: "hashChange",
      uuid: generateUniqueId(),
      startTime: performance.now()
    };
    lazyReportBatch(reportData);
    oldUrl = newUrl;
  }, true);

  /**
   * history 模式
   */
  var from = "";
  window.addEventListener("popstate", function (event) {
    var to = window.location.href;
    var reportData = {
      from: from,
      to: to,
      type: "behavior",
      subType: "popstate",
      uuid: generateUniqueId(),
      startTime: performance.now()
    };
    lazyReportBatch(reportData);
    from = to;
  }, true);
}

function pv() {
  var reportData = {
    type: 'behavior',
    //类型
    subType: 'pv',
    //子类型
    pageUrl: window.location.href,
    //页面url
    startTime: performance.now(),
    //开始时间
    referrer: document.referrer,
    //来源
    uuid: generateUniqueId() //唯一id
  };
  lazyReportBatch(reportData);
}

/**
 * 行为监控
 */
function behavior() {
  onClick();
  pageChange();
  pv();
}

/**
 * 监听错误
 */
function error() {
  //捕获资源加载失败的错误 ：js css img
  window.addEventListener("error", function (e) {
    var target = e.target;
    if (!target) return;
    if (target.src || target.href) {
      var url = target.src || target.href;
      var reportData = {
        type: "error",
        subType: "resource",
        url: url,
        html: target.outerHTML,
        pageUrl: window.location.href,
        path: e.path
      };
      //上报数据
      lazyReportBatch(reportData);
    }
  }, true);

  //捕获js错误
  window.onerror = function (msg, url, linNo, columnNo, error) {
    var reportData = {
      type: "error",
      subType: "js",
      msg: msg,
      url: url,
      linNo: linNo,
      columnNo: columnNo,
      stack: error.stack,
      pageUrl: window.location.href,
      startTime: performance.now()
    };
    //上报数据
    lazyReportBatch(reportData);
  };

  //捕获promise错误 async await
  window.addEventListener("unhandledrejection", function (e) {
    var _e$reason;
    var reportData = {
      type: "error",
      subType: "promise",
      reason: (_e$reason = e.reason) === null || _e$reason === void 0 ? void 0 : _e$reason.stack,
      pageUrl: window.location.href,
      startTime: e.timeStamp
    };
    //上报数据
    lazyReportBatch(reportData);
  }, true);
}

window.__webEyeSDK__ = {
  version: "0.0.1"
};

//针对Vue项目的错误捕获
function install(Vue, options) {
  if (__webEyeSDK__.vue) return;
  __webEyeSDK__.vue = true;
  var handler = Vue.config.errorHandler;

  //vue项目中，通过Vue.config.errorHandler配置全局错误处理函数 捕获错误
  Vue.config.errorHandler = function (err, vm, info) {
    // 上报具体的错误
    var reportData = {
      info: info,
      error: err.stack,
      subType: 'vue',
      type: 'error',
      startTime: window.performance.now(),
      pageUrl: window.location.href
    };
    lazyReportBatch(reportData);
    if (handler) {
      handler.call(this, err, vm, info);
    }
  };
}

//针对React项目的错误捕获
function errorBoundary(err) {
  if (__webEyeSDK__.react) return;
  __webEyeSDK__.react = true;
  // 上报具体的错误
  var reportData = {
    info: info,
    error: err === null || err === void 0 ? void 0 : err.stack,
    subType: 'react',
    type: 'error',
    startTime: window.performance.now(),
    pageUrl: window.location.href
  };
  lazyReportBatch(reportData);
}

/**
 * 初始化
 * @param {Object} options 配置对象
 */
function init(options) {
  setConfig(options);
  //error();
  performance$1();
  //behavior();
}
var webEyeSDK = {
  install: install,
  errorBoundary: errorBoundary,
  performance: performance$1,
  behavior: behavior,
  error: error,
  init: init
};

exports.default = webEyeSDK;
exports.errorBoundary = errorBoundary;
exports.init = init;
exports.install = install;
//# sourceMappingURL=monitor.cjs.js.map
