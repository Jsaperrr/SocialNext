import { lazyReportBatch } from "../report";

export default function observerFCP() {
  const entryHandler = (list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === "first-contentful-paint") {
        observer.disconnect();
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
    }
  };

  /**
   * 统计和计算FCP的时间
   */
  const observer = new PerformanceObserver(entryHandler);
  //buffered:true 表示在页面加载完成后，仍然可以获取到FP的时间
  observer.observe({ type: "paint", buffered: true });
}
