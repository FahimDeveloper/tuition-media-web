import type { JSX, ReactNode } from "react";

export type TPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  icon?: JSX.Element;
  children?: TPath[];
};
