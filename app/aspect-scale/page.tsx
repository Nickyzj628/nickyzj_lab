import { clsx } from '../lib/string';
import styles from './page.module.css';

const Page = () => {
  return <>
    <br />
    <p>待上线方案：CSS容器查询，还是有缺陷（超窄屏幕上无法保持1:1）</p>
    <div className={clsx(styles.modal, 'flex w-[800px] h-96 p-3 resize overflow-auto bg-red-100')}>
      <div className={clsx(styles.modalContainer, 'flex gap-3 p-3 max-h-full w-auto h-full m-auto bg-orange-100')}>
        <div className='flex flex-col flex-1 p-3 gap-3 bg-yellow-100'>
          <div className='aspect-square max-h-[calc(100%-76px)] h-full bg-cyan-100'>
            <img src='https://placeholder.co/360x540/f3e8ff?text=2:3_in_1:1_div' alt='' className='h-full mx-auto' />
          </div>
          <div className='h-16 p-3 bg-blue-100'>64px</div>
        </div>
        <div className='flex-1 max-w-[700px] w-80 p-3 bg-green-100'>320-700px</div>
      </div>
    </div>

    <br />
    <p>实验方案2：CSS容器查询</p>
    <div className={styles.container}>
      <div className={styles.square}>
        <div>1:1</div>
      </div>
    </div>

    <br />
    <p>实验方案1：套两层aspect-ratio容器</p>
    <div className='flex items-center justify-center w-80 h-96 p-3 resize overflow-auto bg-red-100'>
      <div className='flex items-center justify-center max-w-full h-full aspect-square bg-orange-100'>
        <div className='flex items-center justify-center w-full aspect-square bg-yellow-100 overflow-hidden'>1:1</div>
      </div>
    </div>

    <br />
    <p>线上方案：有缺陷（缩窄会溢出）</p>
    <div className='flex justify-center h-screen p-3 bg-red-100'>
      <div className='flex gap-3 p-3 bg-orange-100'>
        <div className='flex flex-wrap p-3 gap-3 bg-yellow-100'>
          <div className='h-[calc(100%-76px)] aspect-square bg-cyan-100'>
            <img src='https://placeholder.co/360x540/f3e8ff?text=2:3_in_1:1_div' alt='' className='h-full mx-auto' />
          </div>
          <div className='w-full h-16 bg-blue-100'>64px</div>
        </div>
        <div className='max-w-[700px] w-80 bg-green-100'>320-700px</div>
      </div>
    </div>
  </>;
};

export default Page;