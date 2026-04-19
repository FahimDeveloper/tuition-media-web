import type {TPath, TSidebarNavItem, TSidebarSubItem} from '../types/path';

const buildPath = (role: string, segments: string[]) => {
  const resolvedSegments = [role, ...segments].filter(Boolean);
  return `/${resolvedSegments.join('/')}`;
};

const resolveSegments = (parentSegments: string[], route: TPath) => {
  // Index routes and pathless parents reuse the parent URL. Any route that
  // should contribute a visible URL segment, such as `history`, must define
  // an explicit `path`.
  if (route.index || !route.path) {
    return parentSegments;
  }

  return [...parentSegments, route.path];
};

const resolveSubItems = (
  routes: TPath[] | undefined,
  role: string,
  parentSegments: string[],
): TSidebarSubItem[] | undefined => {
  const subItems =
    routes?.flatMap((route) => {
      if (!route.showInSidebar || !route.name) {
        return [];
      }

      return [
        {
          name: route.name,
          path: buildPath(role, resolveSegments(parentSegments, route)),
          new: route.new,
          pro: route.pro,
        },
      ];
    }) || [];

  return subItems.length ? subItems : undefined;
};

export const navigationGenerator = (
  navigationPath: TPath[],
  role: string,
): TSidebarNavItem[] => {
  // Sidebar items are derived from the same route tree used by the router so
  // menu labels/paths cannot drift from the actual tutor route config.
  return navigationPath.flatMap((route) => {
    if (!route.showInSidebar || !route.name) {
      return [];
    }

    const routeSegments = resolveSegments([], route);
    const subItems = resolveSubItems(route.children, role, routeSegments);

    return [
      {
        name: route.name,
        icon: route.icon,
        path: subItems ? undefined : buildPath(role, routeSegments),
        subItems,
      },
    ];
  });
};
