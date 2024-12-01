type Observer = (data: any) => void;

export class Subject {
  observers: Observer[];

  constructor() {
    this.observers = [];
  }

  add(observer: Observer) {
    this.observers.push(observer);
  }

  remove(observer: Observer) {
    this.observers = this.observers.filter((ob) => ob !== observer);
  }

  notify(data: any) {
    this.observers.forEach((observer) => observer(data));
  }
}