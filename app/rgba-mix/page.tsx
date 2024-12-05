'use client';

import { ChangeEvent, useState } from "react";
import { debounce } from "../lib/time";

type RGBA = [number, number, number, number];

const HEXtoRGB = (hex: string) => {
  return hex
    .slice(1)
    .split('')
    .reduce((result, chr, i) => {
      if (i % 2 === 0) {
        result.push(chr);
      } else {
        result[result.length - 1] += chr;
      }
      return result;
    }, [] as string[])
    .map((str) => parseInt(str, 16));
}

const RGBtoHEX = (rgb: number[]) => {
  return '#' + rgb.slice(0, 3).map((value) => value.toString(16).padStart(2, '0')).join('');
}

const Page = () => {
  const [base, setBase] = useState<RGBA>([0, 0, 0, 1]);
  const [add, setAdd] = useState<RGBA>([0, 0, 0, 1]);
  const [mixed, setMixed] = useState<RGBA>([0, 0, 0, 1]);

  const onChangeBase = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const [r, g, b] = HEXtoRGB(e.target.value);
    setBase([r, g, b, base[3]]);
  });
  const onChangeBaseAlpha = (e: ChangeEvent<HTMLInputElement>) => {
    base[3] = Number(e.target.value);
    setBase([...base]);
  };

  const onChangeAdd = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const [r, g, b] = HEXtoRGB(e.target.value);
    setAdd([r, g, b, add[3]]);
  });
  const onChangeAddAlpha = (e: ChangeEvent<HTMLInputElement>) => {
    add[3] = Number(e.target.value);
    setAdd([...add]);
  };

  const onMix = () => {
    const mix: RGBA = [255, 255, 255, 1];
    mix[3] = Number((1 - (1 - add[3]) * (1 - base[3])).toFixed(2)); // alpha
    mix[0] = Math.round((add[0] * add[3] / mix[3]) + (base[0] * base[3] * (1 - add[3]) / mix[3])); // red
    mix[1] = Math.round((add[1] * add[3] / mix[3]) + (base[1] * base[3] * (1 - add[3]) / mix[3])); // green
    mix[2] = Math.round((add[2] * add[3] / mix[3]) + (base[2] * base[3] * (1 - add[3]) / mix[3])); // blue
    setMixed(mix);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(mixed.join(', '));
  };

  return (
    <div className='flex flex-col gap-3 w-fit p-3 mt-16 mx-auto bg-zinc-100'>
      <div>
        <div className='flex justify-between gap-3'>
          <span>原色</span>
          <div className='flex gap-3'>
            <input type="color" onChange={onChangeBase} />
            <input type="range" min={0} max={1} step={0.1} value={base[3]} onChange={onChangeBaseAlpha} />
          </div>
        </div>
        <span>{base.join(', ')}</span>
      </div>

      <div>
        <div className='flex justify-between gap-3'>
          <span>待混合色</span>
          <div className='flex gap-3'>
            <input type="color" onChange={onChangeAdd} />
            <input type="range" min={0} max={1} step={0.1} value={add[3]} onChange={onChangeAddAlpha} />
          </div>
        </div>
        <span>{add.join(', ')}</span>
      </div>

      <button className='bg-white' onClick={onMix}>计算</button>

      <div>
        <div className='flex gap-3'>
          <span>混合结果</span>
          <input disabled type="color" value={RGBtoHEX(mixed)} />
        </div>
        <div className='flex justify-between gap-3'>
          <span>{mixed.join(', ')}</span>
          <button onClick={onCopy}>复制</button>
        </div>
      </div>
    </div>
  );
};

export default Page;