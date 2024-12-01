import { delay } from "./time";

/** 监听元素进入视野后执行函数 */
export const inViewPort = (element: HTMLElement, fn: () => void | Promise<void | boolean>, config: IntersectionObserverInit = {}) => {
  const ob = new IntersectionObserver(async (entries) => {
    if (!entries[0].isIntersecting) return;
    const isContinuable = await fn();
    await delay();
    ob.unobserve(element);
    if (isContinuable === false) return;
    ob.observe(element);
  }, config);
  ob.observe(element);
  return ob;
};