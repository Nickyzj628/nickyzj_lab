class Product {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

class Phone extends Product {
  type: string;
  brand: string;

  constructor(name: string, price: number, brand?: string) {
    super(name, price);
    // Phone相关属性
    this.type = 'Phone';
    this.brand = brand ?? 'Unknown brand';
  }
}

class Desktop extends Product {
  type: string;
  brand: string;
  spec: string;

  constructor(name: string, price: number, brand?: string, specs?: string) {
    super(name, price);
    // Desktop相关属性
    this.type = 'Desktop';
    this.brand = brand ?? 'Unknown brand';
    this.spec = specs ?? 'Unknown specs';
  }
}

export const createProduct = (type: string, options: { name: string; price: number; brand?: string; specs?: string; }) => {
  switch (type) {
    case 'phone':
      return new Phone(options.name, options.price, options.brand);
    case 'desktop':
      return new Desktop(options.name, options.price, options.brand, options.specs);
    default:
      throw new Error('Unknown product type: ' + type);
  }
};