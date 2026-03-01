import {useState} from 'react';
import {FiMenu, FiX} from 'react-icons/fi';
import {NavLink} from 'react-router-dom';

type NavigationItem = {
  name: string;
  href: string;
};

type MobileNavLinkProps = {
  item: NavigationItem;
  onNavigate: () => void;
};

type DesktopNavLinkProps = {
  item: NavigationItem;
};

type MobileNavbarProps = {
  navigation: NavigationItem[];
  isOpen: boolean;
  onNavigate: () => void;
};

type DesktopNavbarProps = {
  navigation: NavigationItem[];
};

type ToggleButtonProps = {
  onClick: () => void;
  isOpen: boolean;
};

const navigation: NavigationItem[] = [
  {
    name: 'Tuition',
    href: '/tuition',
  },
  {
    name: 'Login',
    href: '/login',
  },
  {
    name: 'Sign Up',
    href: '/signup',
  },
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

const MobileNavLink = ({item, onNavigate}: MobileNavLinkProps) => {
  return (
    <NavLink
      to={item.href}
      onClick={onNavigate}
      className={({isActive}) =>
        `${mobileLinkBaseClasses} ${
          isActive ? mobileLinkActiveClasses : mobileLinkInactiveClasses
        }`
      }
    >
      {item.name}
    </NavLink>
  );
};

const DesktopNavLink = ({item}: DesktopNavLinkProps) => {
  return (
    <NavLink
      to={item.href}
      className={({isActive}) =>
        `${desktopLinkBaseClasses} ${
          isActive ? desktopLinkActiveClasses : desktopLinkInactiveClasses
        }`
      }
    >
      {item.name}
    </NavLink>
  );
};

const MobileNavbar = ({navigation, isOpen, onNavigate}: MobileNavbarProps) => {
  // Keep the current menu animation behavior while improving visibility styles.
  const visibilityClass = isOpen
    ? 'translate-y-0 opacity-100 visible'
    : '-translate-y-2 opacity-0 invisible';

  return (
    <div
      className={`absolute left-0 top-full w-full px-4 pb-4 pt-2 transition-all duration-300 ease-out md:hidden ${visibilityClass}`}
    >
      <ul
        aria-label="Primary navigation"
        className="space-y-2 rounded-2xl border border-brand-200/70 bg-surface/95 p-3 shadow-[0_12px_30px_rgba(17,45,78,0.12)] backdrop-blur"
      >
        {navigation.map((item) => (
          <li key={item.name}>
            <MobileNavLink item={item} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const DesktopNavbar = ({navigation}: DesktopNavbarProps) => {
  return (
    <nav aria-label="Primary navigation" className="hidden md:flex">
      <ul className="flex items-center gap-2">
        {navigation.map((item) => (
          <li key={item.name}>
            <DesktopNavLink item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

const ToggleButton = ({onClick, isOpen}: ToggleButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-200/70 bg-surface text-neutral shadow-sm transition-all duration-300 hover:border-brand-500 hover:text-brand-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 md:hidden"
    >
      {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
    </button>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleMobileNavigate = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-brand-200/60 bg-surface/90 shadow-[0_4px_16px_rgba(17,45,78,0.06)] backdrop-blur-lg">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="font-poppins text-xl font-extrabold tracking-tight text-neutral transition-colors duration-200 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70"
        >
          Tuition <span className="text-brand-600">Media</span>
        </NavLink>
        <DesktopNavbar navigation={navigation} />
        <ToggleButton onClick={handleToggle} isOpen={isOpen} />
        <MobileNavbar
          navigation={navigation}
          isOpen={isOpen}
          onNavigate={handleMobileNavigate}
        />
      </nav>
    </header>
  );
};

export default Header;
