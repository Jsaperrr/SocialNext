import { lazyReportBatch } from "../report";
import { generateUniqueId } from "../utils";

/**
 * 监听页面切换
 */
export default function pageChange() {
  //hash or history 两种路由模式

  /**
   * hash 模式
   */
  let oldUrl = "";
  window.addEventListener(
    "hashchange",
    function (event) {
      const newUrl = event.newURL;
      const reportData = {
        from: oldUrl,
        to: newUrl,
        type: "behavior",
        subType: "hashChange",
        uuid: generateUniqueId(),
        startTime: performance.now(),
      };
      lazyReportBatch(reportData);
      oldUrl = newUrl;
    },
    true
  );

  /**
   * history 模式
   */
  let from = "";
  window.addEventListener(
    "popstate",
    function (event) {
      const to = window.location.href;
      const reportData = {
        from: from,
        to: to,
        type: "behavior",
        subType: "popstate",
        uuid: generateUniqueId(),
        startTime: performance.now(),
      };
      lazyReportBatch(reportData);
      from = to;
    },
    true
  );
}
