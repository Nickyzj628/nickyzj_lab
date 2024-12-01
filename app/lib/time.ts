/** 延迟一段时间执行后续代码 */
export const delay = (ms = 150) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}

/** 节流，使传入的函数在一段时间内只执行一次 */
export const throttle = (fn: () => void, ms = 150) => {
  let isCountdown = false;
  return async () => {
    if (isCountdown) return;
    isCountdown = true;
    await delay(ms);
    fn();
    isCountdown = false;
  };
};