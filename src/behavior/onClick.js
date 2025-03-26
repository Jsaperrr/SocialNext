import { generateUniqueId } from "../utils";
import { lazyReportBatch } from "../report";
/**
 * 监听点击事件
 */
export default function onClick() {
  ["mousedown", "touchstart"].forEach((eventType) => {
    window.addEventListener(eventType, (e) => {
      const target = e.target;
      if (target.tagName) {
        const reportData = {
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
          eventType,
          path: e.path,
        };
        lazyReportBatch(reportData);
      }
    });
  });
}
