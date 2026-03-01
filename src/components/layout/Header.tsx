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

const mobileLinkBaseClass =
  'flex min-h-11 items-center rounded-xl px-4 py-3 text-base font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50';

const mobileLinkActiveClass = 'bg-primary text-white';
const mobileLinkInactiveClass =
  'text-neutral hover:bg-secondary/20 hover:text-primary';

const desktopLinkBaseClass =
  "group relative flex items-center gap-2 px-2 py-2 text-sm font-semibold transition-all duration-300 before:content-['>'] before:text-primary before:transition-all before:duration-300";

const desktopLinkActiveClass =
  'text-primary before:translate-x-0 before:opacity-100';
const desktopLinkInactiveClass =
  'text-neutral before:-translate-x-1 before:opacity-0 hover:text-primary hover:before:translate-x-0 hover:before:opacity-100';

const MobileNavLink = ({item, onNavigate}: MobileNavLinkProps) => {
  return (
    <NavLink
      to={item.href}
      onClick={onNavigate}
      className={({isActive}) =>
        `${mobileLinkBaseClass} ${
          isActive ? mobileLinkActiveClass : mobileLinkInactiveClass
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
        `${desktopLinkBaseClass} ${
          isActive ? desktopLinkActiveClass : desktopLinkInactiveClass
        }`
      }
    >
      {item.name}
    </NavLink>
  );
};

const MobileNavbar = ({navigation, isOpen, onNavigate}: MobileNavbarProps) => {
  const visibilityClass = isOpen
    ? 'translate-y-0 opacity-100 visible'
    : '-translate-y-2 opacity-0 invisible';

  return (
    <div
      className={`absolute left-0 top-full w-full px-4 pb-4 pt-2 transition-all duration-300 ease-out md:hidden ${visibilityClass}`}
    >
      <ul className="space-y-2 rounded-2xl border border-secondary/40 bg-white/95 p-3 shadow-[0_12px_30px_rgba(7,19,61,0.14)] backdrop-blur">
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
    <div className="hidden md:flex">
      <ul className="flex items-center gap-2">
        {navigation.map((item) => (
          <li key={item.name}>
            <DesktopNavLink item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const ToggleButton = ({onClick, isOpen}: ToggleButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-secondary/40 bg-white text-neutral shadow-sm transition-colors duration-300 hover:border-primary hover:text-primary md:hidden"
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
    <header className="sticky top-0 z-50 border-b border-secondary/35 bg-white/80 backdrop-blur-lg">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="font-poppins text-xl font-extrabold tracking-tight text-neutral"
        >
          Tuition <span className="text-primary">Media</span>
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
