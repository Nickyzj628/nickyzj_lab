"use client";

import { Children, isValidElement, ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import { delay } from "../lib/time";

type SwitchProps = {
  /** 使用方法同`switch(<expression>)` */
  expression?: any;
  children?: ReactElement<SwitchChildProps> | ReactElement<SwitchChildProps>[];
};

type SwitchChildProps = {
  /** 使用方法同`case <condition>`，只有在`Switch`组件内使用，且`Switch`声明了`expression`才会根据条件渲染，否则始终渲染 */
  condition?: any;
  children?: ReactNode;
};

const Switch = ({ expression, children }: SwitchProps) => {
  let defaultChild: ReactElement<SwitchChildProps> | null = null;
  let caseChild: ReactElement<SwitchChildProps> | null = null;

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }
    if (child.type === Switch.Case && caseChild === null && child.props.condition === expression) {
      caseChild = child;
    }
    if (child.type === Switch.Default && defaultChild === null) {
      defaultChild = child;
    }
  });

  return caseChild || defaultChild;
};

Switch.Case = ({ condition, children }: SwitchChildProps) => {
  return condition ? <>{children}</> : null;
};

Switch.Default = ({ children }: SwitchChildProps) => {
  return <>{children}</>;
};

const Page = () => {
  /**
   * 第一个示例用的
   */

  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const reset = () => {
    setData(undefined);
    setError(undefined);
    setLoading(undefined);
  };

  const getData = useCallback(async () => {
    reset();
    setLoading(true);
    // 模拟请求延迟
    await delay(750);
    // 模拟请求成功/失败
    const isSuccess = Math.random() > 0.25;
    if (isSuccess) {
      const hasData = Math.random() > 0.5;
      setData(hasData ? "some data" : null);
    } else {
      setError("some error");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 第二个示例用的
   */

  // vip在[0,3]之间
  const [vip, setVip] = useState(0);
  const upgradeVip = () => setVip(Math.min(vip + 1, 3));
  const downgradeVip = () => setVip(Math.max(0, vip - 1));

  return (
    <div className="mt-12">
      <h3 className="mt-3 text-xl font-semibold">JSX判断多状态、多条件</h3>
      <pre>
        {
          `<div>\n\t{error && <span>{error}</span>}\n\t{loading && <span>loading...</span>}\n\t{!error && !loading && !data && <span>empty</span>}\n\t{data && <div>{data}</div>}\n</div>`
        }
      </pre>
      <div>
        {error && <span>{error}</span>}
        {loading && <span>loading...</span>}
        {!error && !loading && !data && <span>empty</span>}
        {data && <div>{data}</div>}
      </div>
      <button onClick={getData}>重试</button>

      <h3 className="mt-3 text-xl font-semibold">Switch-Case判断单状态、多条件</h3>
      <pre>
        {
          `<Switch expression={vip}>\n\t<Switch.Case condition={1}>一级VIP</Switch.Case>\n\t<Switch.Case condition={2}>二级VIP</Switch.Case>\n\t<Switch.Case condition={3}>三级VIP</Switch.Case>\n\t<Switch.Default>非VIP</Switch.Default>\n</Switch>`
        }
      </pre>
      <div>
        <Switch expression={vip}>
          <Switch.Case condition={1}>一级VIP</Switch.Case>
          <Switch.Case condition={2}>二级VIP</Switch.Case>
          <Switch.Case condition={3}>三级VIP</Switch.Case>
          <Switch.Default>非VIP</Switch.Default>
        </Switch>
      </div>
      <div className="flex gap-3">
        <button onClick={downgradeVip}>降级</button>
        <button onClick={upgradeVip}>升级</button>
      </div>
    </div>
  );
};

export default Page;