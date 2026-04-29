import {useEffect, useState} from 'react';
import {FiMenu, FiMoon, FiSun, FiX} from 'react-icons/fi';
import {Link, NavLink} from 'react-router-dom';
import BrandLogo from '@/components/common/BrandLogo';
import ProfileDropdown from '@/components/layout/header/ProfileDropdown';
import {useTheme} from '@/hooks/useTheme';
import {useAppSelector} from '@/hooks/useAppHooks';

type NavigationItem = {
  name: string;
  href: string;
  guestOnly?: boolean;
};

const navigationItems: NavigationItem[] = [
  {name: 'Home', href: '/'},
  {name: 'Book Demo Class', href: '/demo-class'},
  {name: 'Tuition', href: '/tuition'},
  {name: 'Login', href: '/login', guestOnly: true},
  {name: 'Sign Up', href: '/signup', guestOnly: true},
];

const mobileLinkBaseClasses =
  'flex min-h-12 items-center rounded-xl px-4 py-3 text-base font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70';
const mobileLinkActiveClasses =
  'bg-brand-600 text-text-on-brand shadow-sm shadow-brand-600/20';
const mobileLinkInactiveClasses =
  'text-neutral hover:bg-brand-50 hover:text-brand-700 active:bg-brand-100 dark:hover:bg-brand-500/12 dark:hover:text-brand-300 dark:active:bg-brand-500/16';

const desktopLinkBaseClasses =
  "group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 before:content-['>'] before:text-base before:font-bold before:text-brand-600 before:transition-all before:duration-300 dark:before:text-brand-300";
const desktopLinkActiveClasses =
  'font-bold text-brand-700 before:translate-x-0 before:opacity-100 dark:text-brand-300';
const desktopLinkInactiveClasses =
  'before:-translate-x-1 before:opacity-0 hover:bg-brand-50 hover:text-brand-700 hover:before:translate-x-0 hover:before:opacity-100 dark:hover:bg-brand-500/12 dark:hover:text-brand-300';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const {theme, toggleTheme} = useTheme();
  const isTransparent = !isScrolled;
  const ThemeIcon = theme === 'dark' ? FiSun : FiMoon;
  const themeToggleLabel =
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  // UI-only toggle for now. Replace with real auth state later.
  let isLoggedIn = false;

  const {user, accessToken} = useAppSelector((state) => state.auth);
  if (user && accessToken) {
    isLoggedIn = true;
  }

  const visibleNavItems = isLoggedIn
    ? navigationItems.filter((item) => !item.guestOnly)
    : navigationItems;

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((previousState) => !previousState);
  };

  const handleMobileNavigate = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 16);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, {passive: true});

    return () => {
      window.removeEventListener('scroll', updateScrollState);
    };
  }, []);

  const mobileMenuVisibilityClasses = isMobileMenuOpen
    ? 'pointer-events-auto visible translate-y-0 opacity-100'
    : 'pointer-events-none invisible -translate-y-2 opacity-0';

  const headerBaseClasses =
    'fixed top-0 z-50 w-full transition-all duration-300';
  const headerTransparentClasses =
    'border-b border-transparent bg-transparent shadow-none backdrop-blur-0';
  const headerSolidClasses =
    'border-b border-border bg-surface-elevated/92 shadow-theme-sm backdrop-blur-lg';
  const publicThemeToggleClasses =
    'tm-icon-button h-11 w-11 active:scale-[0.98]';

  return (
    <header
      className={`${headerBaseClasses} ${
        isTransparent ? headerTransparentClasses : headerSolidClasses
      }`}
    >
      <nav className="relative mx-auto flex max-w-7xl items-center px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          aria-label="TutoriumBD home"
          className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70"
        >
          <BrandLogo imgClassName="h-10 w-auto" />
        </Link>

        <ul className="ml-auto hidden items-center gap-2 md:flex">
          {visibleNavItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({isActive}) =>
                  `${desktopLinkBaseClasses} ${
                    isActive
                      ? desktopLinkActiveClasses
                      : desktopLinkInactiveClasses
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={themeToggleLabel}
              className={publicThemeToggleClasses}
            >
              <ThemeIcon size={18} />
            </button>
          </li>
          {isLoggedIn ? (
            <li>
              <ProfileDropdown />
            </li>
          ) : null}
        </ul>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          {isLoggedIn ? <ProfileDropdown /> : null}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeToggleLabel}
            className={publicThemeToggleClasses}
          >
            <ThemeIcon size={18} />
          </button>
          <button
            type="button"
            onClick={handleMobileMenuToggle}
            aria-label={
              isMobileMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={isMobileMenuOpen}
            className={`${publicThemeToggleClasses} h-12 w-12`}
          >
            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        <div
          className={`absolute left-0 top-full w-full px-4 pb-4 pt-2 transition-all duration-300 ease-out md:hidden ${mobileMenuVisibilityClasses}`}
        >
          <ul
            aria-label="Primary navigation"
            className="space-y-2 rounded-2xl border border-border bg-surface-elevated/95 p-3 shadow-theme-lg backdrop-blur"
          >
            {visibleNavItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  onClick={handleMobileNavigate}
                  className={({isActive}) =>
                    `${mobileLinkBaseClasses} ${
                      isActive
                        ? mobileLinkActiveClasses
                        : mobileLinkInactiveClasses
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
