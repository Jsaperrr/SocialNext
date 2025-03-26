import { lazyReportBatch } from "../report";

const entryHandler = (list) => {
  if (observer) {
    observer.disconnect();
  }
  for (const entry of list.getEntries()) {
    const json = entry.toJSON();
    console.log(json);
    const reportData = {
      ...json,
      type: "performance",
      subType: entry.name,
      pageUrl: window.location.href,
    };
    //上报数据
    lazyReportBatch(reportData);
  }
};

/**
 * 统计和计算LCP的时间
 */
// 添加默认导出函数
export default function observerLCP() {
  const observer = new PerformanceObserver(entryHandler);
  //buffered:true 表示在页面加载完成后，仍然可以获取到FP的时间
  observer.observe({ type: ["largest-contentful-paint"], buffered: true });
}
