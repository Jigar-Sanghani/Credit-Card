// utils/cookieUtils.js
import Cookies from "js-cookie";

export const getAlertCount = () => {
  return parseInt(Cookies.get("alertCount") || "0");
};

export const setAlertCount = (count) => {
  Cookies.set("alertCount", count.toString());
};

export const incrementAlertCount = () => {
  const current = getAlertCount();
  setAlertCount(current + 1);
};

export const clearAlertCount = () => {
  Cookies.remove("alertCount");
};
