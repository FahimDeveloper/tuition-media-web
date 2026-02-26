import { Spin } from "antd";
import { Suspense, type JSX } from "react";

const LazyLoad = (Component: React.FC) => (props: JSX.IntrinsicAttributes) => {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex justify-center items-center">
          <Spin className="size-8 text-primary" />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default LazyLoad;
