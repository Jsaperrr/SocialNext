import fetch from "./fetch";
import observerEntries from "./observerEntries";
import observerFCP from "./observerFCP";
import observerLCP from "./observerLCP";
import observerLoad from "./observerLoad";
import observerPaint from "./observerPaint";
import xhr from "./xhr";

/**
 * 性能监控
 */
export default function performance() {
  fetch();
  observerEntries();
  observerFCP();
  observerLCP();
  observerLoad();
  observerPaint();
  xhr();
}
