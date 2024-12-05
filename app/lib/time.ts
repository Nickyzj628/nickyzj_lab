/** 延迟一段时间执行后续代码 */
export const delay = (ms = 150) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}

/** 防抖，使传入的函数距离上次调用一段时间后再执行，默认150ms */
export const debounce = (fn: (...args: any[]) => void, ms = 150) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, ms);
  };
};

/** 节流，使传入的函数在一段时间内只执行一次，默认150ms */
export const throttle = (fn: (...args: any[]) => void, ms = 150) => {
  let lastRuntime = 0;
  return async (...args: any[]) => {
    const now = Date.now();
    if (now - lastRuntime < ms) return;
    fn(...args);
    lastRuntime = now;
  };
};