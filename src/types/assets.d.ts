declare module "*.svg?react" {
  import type { FC, SVGProps } from "react";

  export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  const component: FC<SVGProps<SVGSVGElement>>;
  export default component;
}
