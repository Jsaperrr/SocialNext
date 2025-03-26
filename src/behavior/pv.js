import { lazyReportBatch } from "../report";
import { generateUniqueId } from "../utils";

export default function pv() {
  const reportData = {
    type : 'behavior',//类型
    subType : 'pv',//子类型
    pageUrl : window.location.href,//页面url
    startTime : performance.now(),//开始时间
    referrer : document.referrer,//来源
    uuid : generateUniqueId(),//唯一id
  }
  lazyReportBatch(reportData);
}
