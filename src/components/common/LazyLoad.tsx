import { Spin } from "antd";
import { Suspense, type JSX } from "react";

const LazyLoad = (Component: React.FC) => (props: JSX.IntrinsicAttributes) => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Spin className="text-primary size-8" />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default LazyLoad;
