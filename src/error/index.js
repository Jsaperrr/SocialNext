import { lazyReportBatch } from "../report";

/**
 * 监听错误
 */
export default function error() {
  //捕获资源加载失败的错误 ：js css img
  window.addEventListener(
    "error",
    function (e) {
      const target = e.target;
      if (!target) return;
      if (target.src || target.href) {
        const url = target.src || target.href;
        const reportData = {
          type: "error",
          subType: "resource",
          url,
          html: target.outerHTML,
          pageUrl: window.location.href,
          path: e.path,
        };
        //上报数据
        lazyReportBatch(reportData);
      }
    },
    true
  );
  
  //捕获js错误
  window.onerror = function (msg, url, linNo, columnNo, error) {
    const reportData = {
      type: "error",
      subType: "js",
      msg,
      url,
      linNo,
      columnNo,
      stack: error.stack,
      pageUrl: window.location.href,
      startTime: performance.now(),
    };
    //上报数据
    lazyReportBatch(reportData);
  };

  //捕获promise错误 async await
  window.addEventListener("unhandledrejection", function (e) {
    const reportData = {
      type: "error",
      subType: "promise",
      reason: e.reason?.stack,
      pageUrl: window.location.href,
      startTime: e.timeStamp,
    };
    //上报数据
    lazyReportBatch(reportData);
  }, true);
}
