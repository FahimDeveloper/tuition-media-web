import type {ComponentType, ReactNode, SVGProps} from 'react';

// Sidebar icons are stored as component references so route config can drive UI
// without instantiating JSX at definition time.
export type TSidebarIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type TSidebarSubItem = {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
};

export type TSidebarNavItem = {
  name: string;
  icon?: TSidebarIcon;
  path?: string;
  subItems?: TSidebarSubItem[];
};

export type TPath = {
  name?: string;
  path?: string;
  index?: boolean;
  element?: ReactNode;
  children?: TPath[];
  // Sidebar metadata lives next to the route so router and nav stay in sync.
  showInSidebar?: boolean;
  icon?: TSidebarIcon;
  pro?: boolean;
  new?: boolean;
};
