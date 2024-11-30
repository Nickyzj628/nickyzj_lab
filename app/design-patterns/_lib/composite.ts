/** 文件系统基类，包含所有字类所需的通用方法，供子类继承 */
class FileSystemComponent {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  /** 获取文件/文件夹大小 */
  getSize() {
    throw new Error('This function must be implemented!');
  }

  /** 打印文件/文件夹信息 */
  printInfo() {
    throw new Error('This function must be implemented!');
  }
}

/** 文件叶子节点，无法包含子类 */
export class File extends FileSystemComponent {
  size: number;

  constructor(name: string, size: number) {
    super(name);
    this.size = size;
  }

  getSize(): number {
    return this.size;
  }

  printInfo() {
    console.log(`${this.name} - ${this.size}`);
  }
}

/** 文件夹组合节点，可以包含其他叶子/组合节点 */
export class Folder extends FileSystemComponent {
  children: (File | Folder)[];

  constructor(name: string) {
    super(name);
    this.children = [];
  }

  /** 添加子文件/文件夹 */
  add(component: File | Folder) {
    this.children.push(component);
  }

  /** 递归获取自身和所有子项大小 */
  getSize(): number {
    return this.children.reduce((result, child) => result + child.getSize(), 0);
  }

  /** 递归打印自身和所有子项内容 */
  printInfo() {
    console.log(`${this.name}`);
    this.children.forEach((child) => {
      child.printInfo();
    });
  }
}