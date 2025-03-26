import { lazyReportBatch } from "../report";
/**
 * 监听页面所有资源加载
 */
export default function observerEntries() {
  if (document.readyState === "complete") {
    observerEvent();
  } else {
    const onload = () => {
      observerEvent();
      window.removeEventListener("load", onload, true);
    };
    window.addEventListener("load", onload, true);
  }
}

export function observerEvent() {
  const entryHandler = (list) => {
    const data = list.getEntries();
    for (let entry of data) {
      if (observer) {
        observer.disconnect();
      }
      const reportData = {
        name: entry.name, //资源的名称
        type: "performance", //类型
        subType: entry.entryType, //子类型
        sourceType: entry.initiatorType, //资源类型
        duration: entry.duration, //加载时间
        dns: entry.domainLookupEnd - entry.domainLookupStart, //DNS解析时间
        tcp: entry.connectEnd - entry.connectStart, //TCP连接时间
        redirect: entry.redirectEnd - entry.redirectStart, //重定向时间
        ttfb: entry.responseStart, //首字节时间
        protocol: entry.nextHopProtocol, //请求协议
        responseBodySize: entry.encodedBodySize, //响应体大小
        responseHeaderSize: entry.transferSize - entry.encodedBodySize, //响应头大小
        transferSize: entry.transferSize, //请求内容大小
        resourceSize: entry.decodedBodySize, //资源解压后大小
        startTime: performance.now(), //开始时间
      };
      //上报数据
      lazyReportBatch(reportData);
    }
  };

  /**
   * 页面所有资源加载
   */
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: ["resource"], buffered: true });
}
