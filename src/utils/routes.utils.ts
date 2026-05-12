import { createElement } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import type { TPath } from "@/types";

const getDefaultChildTarget = (
  routes: TPath[] | undefined,
): string | undefined => {
  if (!routes?.length) {
    return undefined;
  }

  for (const route of routes) {
    if (route.path) {
      return route.path;
    }

    const nestedTarget = getDefaultChildTarget(route.children);

    if (nestedTarget) {
      return nestedTarget;
    }
  }

  return undefined;
};

const mapRoute = (route: TPath): RouteObject => {
  const mappedChildren = route.children?.length
    ? route.children.map(mapRoute)
    : undefined;
  const defaultChildTarget = getDefaultChildTarget(route.children);
  const hasExplicitIndexChild = route.children?.some((child) => child.index);
  const children =
    mappedChildren && route.path && defaultChildTarget && !hasExplicitIndexChild
      ? [
          // Visiting a parent route should land on its first addressable child.
          // We inject one explicit index redirect here so the policy stays in
          // one place instead of being repeated in every route config.
          {
            index: true,
            element: createElement(Navigate, {
              to: defaultChildTarget,
              replace: true,
            }),
          },
          ...mappedChildren,
        ]
      : mappedChildren;

  if (route.index) {
    // React Router treats index routes as a separate branch that cannot have a path.
    return {
      index: true,
      element: route.element,
    };
  }

  return {
    // Routes with children can still be pathless, which makes them grouping
    // routes only. They can render an element, but they do not add a URL segment.
    path: route.path,
    element: route.element,
    children,
  };
};

export const routesGenerator = (routesPath: TPath[]): RouteObject[] => {
  // Ignore empty config nodes so the router only receives valid route objects.
  return routesPath
    .map(mapRoute)
    .filter((route) => route.index || route.path || route.children?.length);
};
