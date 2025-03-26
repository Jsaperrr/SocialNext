import { lazyReportBatch } from "../report";

/**
 * 监听页面加载
 */
export default function observerLoad() {
  window.addEventListener("pageShow", function (event) {
    requestAnimationFrame(() => {
      ["load"].forEach((type) => {
        const reportData = {
          type: "performance",
          subType: type,
          pageUrl: window.location.href,
          startTime: performance.now() - event.timeStamp,
        };
        //上报数据
        lazyReportBatch(reportData);
      });
    }, true);
  });
}
