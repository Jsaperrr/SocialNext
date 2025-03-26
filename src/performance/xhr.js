import { lazyReportBatch } from "../report";

/**
 * 重写XMLHttpRequest
 */
export const originalProto = XMLHttpRequest.prototype;
export const originalSend = originalProto.send;
export const originalOpen = originalProto.open;

function overwriteOpenAndSend() {
  originalProto.open = function newOpen(...args) {
    this.url = args[1];
    this.method = args[0];
    originalOpen.apply(this,args);
  }
  originalProto.send = function newSend(...args) {
    this.startTime = Date.now();
    const onLoaded = () => {
      this.endTime = Date.now();
      this.duration = this.endTime - this.startTime;
      const { url,method,startTime,endTime,duration,status } = this;
      const reportData = {
        status,
        url,
        startTime,
        endTime,
        duration,
        method: method.toUpperCase(),
        type: 'performance',
        success: status >= 200 && status <300,
        subType: 'xhr',
      }
      //上报数据
      lazyReportBatch(reportData);
      this.removeEventListener('loadend',onLoaded,true);
    }
    this.addEventListener('loadend',onLoaded,true);
    originalSend.apply(this,args);
  }
}

/**
 * 监听XMLHttpRequest
 */
export default function xhr() {
  overwriteOpenAndSend();
}