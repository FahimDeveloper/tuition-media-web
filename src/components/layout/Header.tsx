import {useEffect, useState} from 'react';
import {FiMenu, FiX} from 'react-icons/fi';
import {NavLink, useLocation} from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

type NavigationItem = {
  name: string;
  href: string;
  guestOnly?: boolean;
};

const navigationItems: NavigationItem[] = [
  {name: 'Tuition', href: '/tuition'},
  {name: 'Login', href: '/login', guestOnly: true},
  {name: 'Sign Up', href: '/signup', guestOnly: true},
];

const mobileLinkBaseClasses =
  'flex min-h-12 items-center rounded-xl px-4 py-3 text-base font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70';
const mobileLinkActiveClasses =
  'bg-brand-600 text-text-on-brand shadow-sm shadow-brand-600/20';
const mobileLinkInactiveClasses =
  'text-neutral hover:bg-brand-50 hover:text-brand-700 active:bg-brand-100';

const desktopLinkBaseClasses =
  "group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 before:content-['>'] before:text-base before:font-bold before:text-brand-600 before:transition-all before:duration-300";
const desktopLinkActiveClasses =
  'font-bold text-brand-700 before:translate-x-0 before:opacity-100';
const desktopLinkInactiveClasses =
  'before:-translate-x-1 before:opacity-0 hover:bg-brand-50 hover:text-brand-700 hover:before:translate-x-0 hover:before:opacity-100';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const {pathname} = useLocation();

  const isHome = pathname === '/';
  const isTransparent = isHome && !isScrolled;

  // UI-only toggle for now. Replace with real auth state later.
  const isLoggedIn = true;

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
    'border-b border-brand-200/60 bg-surface/90 shadow-[0_4px_16px_rgba(17,45,78,0.06)] backdrop-blur-lg';

  return (
    <header
      className={`${headerBaseClasses} ${
        isTransparent ? headerTransparentClasses : headerSolidClasses
      }`}
    >
      <nav className="relative mx-auto flex max-w-7xl items-center px-4 py-3 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="font-poppins text-xl font-extrabold tracking-tight text-neutral transition-colors duration-200 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70"
        >
          Tuition <span className="text-brand-600">Media</span>
        </NavLink>

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
            onClick={handleMobileMenuToggle}
            aria-label={
              isMobileMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={isMobileMenuOpen}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-200/70 bg-surface text-neutral shadow-sm transition-all duration-300 hover:border-brand-500 hover:text-brand-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70"
          >
            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        <div
          className={`absolute left-0 top-full w-full px-4 pb-4 pt-2 transition-all duration-300 ease-out md:hidden ${mobileMenuVisibilityClasses}`}
        >
          <ul
            aria-label="Primary navigation"
            className="space-y-2 rounded-2xl border border-brand-200/70 bg-surface/95 p-3 shadow-[0_12px_30px_rgba(17,45,78,0.12)] backdrop-blur"
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
