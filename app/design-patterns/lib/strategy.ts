class DiscountStrategy {
  getDiscount() {
    throw new Error("This function must be implemented!");
  }
}

class NoVipDiscount extends DiscountStrategy {
  getDiscount() {
    return 1.0;
  }
}

class MonthlyVipDiscount extends DiscountStrategy {
  getDiscount() {
    return 0.9;
  }
}

class QuarterlyVipDiscount extends DiscountStrategy {
  getDiscount() {
    return 0.75;
  }
}

class YearlyVipDiscount extends DiscountStrategy {
  getDiscount() {
    return 0.6;
  }
}

// 策略配置对象
const discountStrategies = {
  Monthly: new MonthlyVipDiscount(),
  Quarterly: new QuarterlyVipDiscount(),
  Yearly: new YearlyVipDiscount(),
  Default: new NoVipDiscount(),
};

type Strategy = typeof discountStrategies[keyof typeof discountStrategies];

// 上下文类，根据用户的vip等级选择对应的折扣策略
export class VipDiscountContext {
  strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  // 动态设置策略
  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  calculatePrice(originalPrice: number) {
    const discount = this.strategy.getDiscount();
    return originalPrice * discount;
  }
}

export const getDiscountStrategy = (vipLevel: keyof typeof discountStrategies) => {
  return discountStrategies[vipLevel] || discountStrategies.Default;
};