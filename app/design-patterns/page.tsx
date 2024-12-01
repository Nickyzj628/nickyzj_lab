'use client';

import { useEffect } from 'react';
import { delay } from '../lib/time';
import { DataAdapter } from './lib/adapter';
import { ApiRequestBuilder } from './lib/builder';
import { File, Folder } from './lib/composite';
import { createProduct } from './lib/factory';
import { PubSub } from './lib/pubsub';
import singleton from './lib/singleton';
import { getDiscountStrategy, VipDiscountContext } from './lib/strategy';
import { Subject } from './lib/subject';

const Page = () => {
  useEffect(() => {
    const newLine = async () => {
      await delay(0);
      console.log();
    }

    (async () => {
      /**
       * 验证导入的2个对象是否是单例的
       */
      await delay(300);
      const singleton2 = (await import('./lib/singleton')).default;

      // true 
      // Object { timestamp: 1732938565252 }
      // Object { timestamp: 1732938565252 }
      console.log(singleton === singleton2, singleton, singleton2);
      await newLine();


      /**
       * 使用工厂模式创建不同的设备
       */
      const phone = createProduct('phone', {
        name: 'iPhone XS',
        price: 999,
        brand: 'Apple',
      });
      const desktop = createProduct('desktop', {
        name: 'personal computer',
        price: 8888,
        brand: 'MSI',
        specs: 'R7 3800X, 6750XT, 32GB MEM, 2TB SSD',
      });

      // {
      //   'name': 'iPhone XS',
      //   'price': 999,
      //   'type': 'Phone',
      //   'brand': 'Apple'
      // }
      console.log(phone);
      // {
      //   'name': 'personal computer',
      //   'price': 8888,
      //   'type': 'Desktop',
      //   'brand': 'MSI',
      //   'spec': 'R7 3800X, 6750XT, 32GB MEM, 2TB SSD'
      // }
      console.log(desktop);
      await newLine();


      /**
       * 使用建造者模式生成api配置
       */
      const request = new ApiRequestBuilder()
        .setMethod('GET')
        .setUrl('https://api.com/users')
        .setHeaders({
          'Authorization': 'Bearer jwt-token',
          'Accept': 'application/json',
        })
        .build();
      // {
      //   'method': 'GET',
      //   'url': 'https://api.com/users',
      //   'headers': {
      //     'Authorization': 'Bearer jwt-token',
      //     'Accept': 'application/json'
      //   },
      //   'body': {}
      // }
      console.log(request);
      await newLine();


      /**
       * 使用组合模式创建文件系统
       */
      const file1 = new File("file1.txt", 10);
      const file2 = new File("file2.jpg", 20);
      const file3 = new File("file3.zip", 30);

      const folder1 = new Folder("Folder 1");
      folder1.add(file1);
      folder1.add(file2);

      const folder2 = new Folder("Folder 2");
      folder2.add(file3);

      const folder3 = new Folder("Folder 3");

      const root = new Folder("ROOT FOLDER");
      root.add(folder1);
      root.add(folder2);
      root.add(folder3);

      // ROOT FOLDER
      // Folder 1
      // file1.txt - 10
      // file2.jpg - 20
      // Folder 2
      // file3.zip - 30
      // Folder 3
      root.printInfo();
      // Root size: 60
      console.log("Root size: " + root.getSize());
      await newLine();


      /**
       * 使用适配器模式请求不同版本的接口，返回统一的数据结构
       */
      const dataAdpt1 = new DataAdapter("v1");
      const dataAdpt2 = new DataAdapter("v2");

      // [
      //   {
      //     "id": 1,
      //     "name": "A",
      //     "description": ""
      //   },
      //   {
      //     "id": 2,
      //     "name": "B",
      //     "description": ""
      //   }
      // ]
      dataAdpt1.getData().then(console.log);
      // [
      //   {
      //     "id": 10001,
      //     "name": "A",
      //     "description": "Data A"
      //   },
      //   {
      //     "id": 10002,
      //     "name": "B",
      //     "description": "Data B"
      //   }
      // ]
      dataAdpt2.getData().then(console.log);
      await newLine();


      /**
       * 使用策略模式根据vip等级获取折扣
       */
      const vipLevel = "Yearly";
      const originalPrice = 100;

      const strategy = getDiscountStrategy(vipLevel);
      const vipContext = new VipDiscountContext(strategy);
      const finalPrice = vipContext.calculatePrice(originalPrice);

      // VIP等级: Yearly
      // 商品原价: $100
      // 折后价格: $60.00
      console.log(`VIP等级: ${vipLevel}`);
      console.log(`商品原价: $${originalPrice}`);
      console.log(`折后价格: $${finalPrice.toFixed(2)}`);
      await newLine();


      /**
       * 使用观察者模式接收消息
       */
      const subject = new Subject();

      // Ob 1: Hello from subject
      const observer1 = (data: any) => console.log("Ob 1:", data);
      // Ob 2: Hello from subject
      const observer2 = (data: any) => console.log('Ob 2:', data);

      // 注册观察者
      subject.add(observer1);
      subject.add(observer2);

      // 发送通知
      subject.notify("Hello from subject");
      await newLine();


      /**
       * 使用发布订阅模式接收消息
       */
      const pubsub = new PubSub();

      // 订阅事件
      // Ob 1: Hello from pubsub
      pubsub.subscribe("message", (data) => console.log("Ob 1:", data));
      // Ob 2: Hello from pubsub
      pubsub.subscribe("message", (data) => console.log('Ob 2:', data));

      // 发布事件
      pubsub.publish("message", "Hello from pubsub");
    })();
  }, []);

  return (
    <div className="absolute grid place-items-center size-full">请看控制台</div>
  )
};

export default Page;