/* eslint-disable react-hooks/set-state-in-effect */

import {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import BrandLogo from '@/components/common/BrandLogo';
import {ChevronDownIcon, HorizontaLDots} from '@/icons';
import {useSidebar} from '@/context/dashboard/SidebarContext';
import {tutorPath} from '@/routers/tutor.routes';
import type {TSidebarNavItem} from '@/types/path';
import {navigationGenerator} from '@/utils/navigationGenerator';

// The sidebar reads directly from the shared tutor route config so menu items
// and `/tutor/*` routes stay aligned.
const navItems: TSidebarNavItem[] = navigationGenerator(tutorPath, 'tutor');

const AppSidebar: React.FC = () => {
  const {isExpanded, isMobileOpen, isHovered, setIsHovered} = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<number, number>>(
    {},
  );
  const subMenuRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    // Keep the matching parent section expanded when a nested route is active.
    const matchedSubmenuIndex = navItems.findIndex((nav) =>
      nav.subItems?.some((subItem) => subItem.path === location.pathname),
    );

    setOpenSubmenu(matchedSubmenuIndex >= 0 ? matchedSubmenuIndex : null);
  }, [location.pathname]);

  useEffect(() => {
    // Measure submenu content once it opens so the existing height animation
    // can keep using inline `height` values.
    if (openSubmenu !== null) {
      if (subMenuRefs.current[openSubmenu]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [openSubmenu]: subMenuRefs.current[openSubmenu]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu === index) {
        return null;
      }
      return index;
    });
  };

  const renderMenuItems = () => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index)}
              className={`menu-item group ${
                openSubmenu === index
                  ? 'menu-item-active'
                  : 'menu-item-inactive'
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? 'lg:justify-center'
                  : 'lg:justify-start'
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu === index
                    ? 'menu-item-icon-active'
                    : 'menu-item-icon-inactive'
                }`}
              >
                {nav.icon ? <nav.icon /> : null}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu === index ? 'rotate-180 text-brand-500' : ''
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? 'menu-item-icon-active'
                      : 'menu-item-icon-inactive'
                  }`}
                >
                  {nav.icon ? <nav.icon /> : null}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[index] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu === index
                    ? `${subMenuHeight[index] || 0}px`
                    : '0px',
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? 'menu-dropdown-item-active'
                          : 'menu-dropdown-item-inactive'
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? 'menu-dropdown-badge-active'
                                : 'menu-dropdown-badge-inactive'
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? 'menu-dropdown-badge-active'
                                : 'menu-dropdown-badge-inactive'
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 left-0 z-50 mt-16 flex h-screen flex-col border-r border-border bg-surface-elevated px-5 text-text-strong transition-all duration-300 ease-in-out lg:mt-0 
        ${
          isExpanded || isMobileOpen
            ? 'w-72.5'
            : isHovered
              ? 'w-72.5'
              : 'w-22.5'
        }
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
        }`}
      >
        <Link
          to="/"
          aria-label="TutoriumBD home"
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          {isExpanded || isHovered || isMobileOpen ? (
            <BrandLogo imgClassName="h-10 w-auto" width={150} height={40} />
          ) : (
            <BrandLogo
              variant="icon"
              imgClassName="h-8 w-8 rounded-lg object-cover"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>{renderMenuItems()}</div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
