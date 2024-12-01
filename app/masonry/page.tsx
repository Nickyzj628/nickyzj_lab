'use client';

import { useEffect, useRef, useState } from "react";
import { inViewPort } from "../lib/dom";
import { randomInt } from "../lib/math";
import { clsx } from "../lib/string";
import { delay, throttle } from "../lib/time";

type MasonryProps = {
  className?: string;
  /** 间隔几份元素，而非像素 */
  gap?: number;
  children?: React.ReactNode;
}

/** 瀑布流每行高度，越小越好 */
const ROW_HEIGHT = 2;

/** 瀑布流，核心思路是用grid-auto-rows设置每行高度为2px，再用grid-row-end设置一个元素占几份行高 */
const Masonry = (props: MasonryProps) => {
  const { gap = 1 } = props;

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // 计算元素所占行数
    const calcRows = (startIdx = 0) => {
      // 获取容器下的所有一级子元素
      const items = Array.from(container.current!.children).slice(startIdx);
      // 获取当前列数
      const cols = window.getComputedStyle(container.current!).gridTemplateColumns.split(" ").length;
      items.forEach((item, index) => {
        // 给元素增加上间距（每列第一个元素不给）
        const marginTop = index >= cols ? gap : 0;
        // 根据元素高度设置元素占用的行数
        // 缺陷：Math.floor/ceil都会导致一些元素少/多一份行高，折中一下使用round，配合尽可能小的ROW_HEIGHT，最坏情况只少/多占用半份行高（1px）
        const rows = Math.round(item.clientHeight / ROW_HEIGHT) + marginTop;
        (item as HTMLDivElement).style.gridRowEnd = `span ${rows}`;
      });
    };

    // 图片全部加载完成再排版
    let loadedImageCount = 0;
    const ob = new MutationObserver((entries) => {
      // 先收集所有图片
      const newElements: HTMLElement[] = [];
      const images: HTMLImageElement[] = [];
      entries.forEach((entry) => {
        const node = entry.addedNodes[0] as HTMLElement;
        const nodeImages = node.querySelectorAll("img");
        newElements.push(node);
        images.push(...nodeImages);
        // 加载完成前直接隐藏，也可以改成骨架屏
        node.style.visibility = "hidden";
      });
      // 加载完成后排版
      const onCalcRows = async () => {
        // 只对追加的元素做排版
        calcRows(entries.length - newElements.length);
        // 排版结束再展示
        await delay();
        newElements.forEach((node) => {
          node.style.visibility = "visible";
        });
      }
      // 没有要加载的图片
      if (images.length === 0) {
        onCalcRows();
        return;
      }
      // 等待所有图片加载完
      const onImageLoad = async () => {
        if (++loadedImageCount < images.length) return;
        onCalcRows();
      };
      images.forEach((image) => {
        image.onload = onImageLoad;
      });
    });

    ob.observe(container.current, { childList: true });
    window.addEventListener("resize", () => throttle(calcRows));

    return () => {
      ob.disconnect();
      window.removeEventListener("resize", () => throttle(calcRows));
      loadedImageCount = 0;
    };
  }, [gap]);

  return (
    <div
      ref={container}
      className={clsx("grid grid-cols-4 items-end", props.className)}
      style={{
        gridAutoRows: ROW_HEIGHT,
        columnGap: ROW_HEIGHT * gap,
      }}
    >
      {props.children}
    </div>
  );
};

/** 获取一组随机宽高的数据 */
const getItems = (pageSize = 20) => {
  return Array(pageSize).fill(null).map(() => [randomInt(200, 500), randomInt(200, 500)]);
};

const Page = () => {
  const loadingRef = useRef(null);
  const [items, setItems] = useState<number[][]>([]);
  useEffect(() => {
    if (!loadingRef.current) return;
    const ob = inViewPort(loadingRef.current, () => {
      setItems((prev) => [...prev, ...getItems()]);
    });
    return () => {
      ob.disconnect();
    }
  }, []);

  return <>
    <p>核心思路：用grid-auto-rows设置每行高度为2px，再用grid-row-end设置一个元素占几行</p>
    <Masonry gap={6} className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 w-full p-3">
      {items.map(([width, height], index) => (
        <div key={index} className="bg-zinc-300 rounded-xl" style={{ height }}></div>
      ))}
    </Masonry>
    <div ref={loadingRef} />
  </>
};

export default Page;