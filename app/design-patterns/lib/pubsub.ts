type Callback = (data: any) => void;

export class PubSub {
  events: Record<string, Callback[]>;

  constructor() {
    // 存放事件和订阅者
    this.events = {};
  }

  // 订阅事件
  subscribe(event: string, callback: Callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  // 发布事件
  publish(event: string, data: any) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  }
}