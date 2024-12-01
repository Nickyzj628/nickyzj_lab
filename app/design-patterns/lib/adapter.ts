// 模拟V1接口
export const getDataV1 = async () => (
  {
    data: [
      { dataId: 1, dataName: "A" },
      { dataId: 2, dataName: "B" },
    ],
  }
);

// 模拟V2接口，相比v1：
// 1. 直接返回数组，而不是data对象；
// 2. 去除字段前缀；
// 3. 追加字段。
export const getDataV2 = async () => (
  [
    { id: 10001, name: "A", description: "Data A" },
    { id: 10002, name: "B", description: "Data B" },
  ]
);

// 模拟V3接口
// ...

type Version = "v1" | "v2";
type ResponseV1 = Awaited<ReturnType<typeof getDataV1>>;
type ResponseV2 = Awaited<ReturnType<typeof getDataV2>>;

export class DataAdapter {
  version: Version;

  constructor(version: Version) {
    this.version = version;
  }

  // 统一调用这个方法，在里面请求各个版本的接口
  async getData() {
    let rawData = null;

    if (this.version === "v1") {
      rawData = await getDataV1();
    } else if (this.version === "v2") {
      rawData = await getDataV2();
    } else {
      throw new Error(`Unsupported version: ${this.version}`);
    }

    return this.adaptData(rawData);
  }

  // 兼容/统一数据格式
  adaptData(data: ResponseV1 | ResponseV2) {
    if (this.version === "v1") {
      return (data as ResponseV1).data.map(item => ({
        id: item.dataId,
        name: item.dataName,
        description: "",
      }));
    }
    if (this.version === "v2") {
      return (data as ResponseV2).map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
      }));
    }
    throw new Error(`No adapter available for version: ${this.version}`);
  }
}