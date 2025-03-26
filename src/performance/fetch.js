import { lazyReportBatch } from "../report";

/**
 * 重写fetch
 */
const originalFetch = window.fetch;
function overwriteFetch() {
  window.fetch = function newFetch(url, config) {
    const startTime = Date.now();
    const reportData = {
      type: "performance",
      subType: "fetch",
      url,
      startTime,
      method: config.method,
    };
    return originalFetch(url, config)
      .then((res) => {
        const endTime = Date.now();
        reportData.endTime = endTime;
        reportData.duration = endTime - startTime;
        const data = res.clone();
        reportData.status = data.status;
        reportData.success = data.ok;
        //上报数据
        lazyReportBatch(reportData);
        return res;
      })
      .catch((err) => {
        const endTime = Date.now();
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
export default function fetch() {
  overwriteFetch();
}
