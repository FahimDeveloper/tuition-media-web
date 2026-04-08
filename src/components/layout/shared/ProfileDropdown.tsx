import {useAppSelector} from '@/hooks/useAppHooks';
import {
  loggedOutUser,
  selectCurrentUser,
} from '@/redux/features/auth/authSlice';
import {type ReactNode, useEffect, useId, useRef, useState} from 'react';
import {
  FiChevronDown,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiSettings,
  FiUser,
} from 'react-icons/fi';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

type ProfileAction = {
  label: string;
  href: string;
  description: string;
  icon: ReactNode;
};

type MockUser = {
  fullName: string;
  role: string;
  email: string;
  phone: string;
  image: string;
};

const mockUser: MockUser = {
  fullName: 'John Doe',
  role: 'Teacher',
  email: 'john.doe@example.com',
  phone: '+1 (555) 013-7890',
  image: 'https://readymadeui.com/profile_6.webp',
};

const profileActions: ProfileAction[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    description: 'Track your activity overview',
    icon: <FiGrid size={18} />,
  },
  {
    label: 'My Profile',
    href: '/dashboard/profile',
    description: 'Update your personal info',
    icon: <FiUser size={18} />,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    description: 'Manage preferences and alerts',
    icon: <FiSettings size={18} />,
  },
];

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  console.log(currentUser);

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const firstActionRef = useRef<HTMLAnchorElement | null>(null);
  const menuId = useId();

  const closeMenu = (shouldFocusTrigger = false) => {
    setIsOpen(false);

    if (shouldFocusTrigger) {
      requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }
  };

  const toggleMenu = () => {
    setIsOpen((previousState) => !previousState);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerOutside = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current) {
        return;
      }

      if (!containerRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu(true);
      }
    };

    document.addEventListener('mousedown', handlePointerOutside);
    document.addEventListener('touchstart', handlePointerOutside, {
      passive: true,
    });
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerOutside);
      document.removeEventListener('touchstart', handlePointerOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    requestAnimationFrame(() => {
      firstActionRef.current?.focus();
    });
  }, [isOpen]);

  const handleLogout = () => {
    // TODO: Add logout logic
    closeMenu(true);
    dispatch(loggedOutUser());
    Swal.fire({
      title: 'Success',
      text: 'You have successfully logged out.',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      iconColor: '#355F92',
    });
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleMenu}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? 'Close account menu' : 'Open account menu'}
        className={`inline-flex min-h-11 items-center rounded-full border bg-surface transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 dark:border-gray-800 dark:bg-white/[0.03] ${
          isOpen
            ? 'border-brand-400 text-brand-700 dark:text-brand-300'
            : 'border-brand-200/70 text-neutral hover:border-brand-500 hover:text-brand-700 dark:text-gray-300 dark:hover:border-brand-400 dark:hover:text-white'
        } px-1.5 md:gap-2 md:rounded-full md:px-2.5`}
      >
        <img
          src={mockUser.image}
          alt={`${mockUser.fullName} profile`}
          className="h-8 w-8 rounded-full object-cover ring-1 ring-brand-200"
        />

        <span className="hidden max-w-32 truncate text-sm font-semibold md:block">
          {currentUser?.first_name}
        </span>
        <FiChevronDown
          size={16}
          className={`hidden transition-transform duration-200 md:block ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Account menu"
          className="absolute right-0 z-1000 mt-2 w-[min(20rem,calc(100vw-1.5rem))] rounded-2xl border border-brand-200/80 bg-surface shadow-[0_12px_30px_rgba(17,45,78,0.18)] dark:border-gray-800 dark:bg-gray-dark dark:shadow-[0_18px_44px_rgba(3,7,18,0.38)]"
        >
          <div className="flex items-center gap-3 border-b border-brand-100 px-4 py-4 dark:border-gray-800">
            <img
              src={mockUser.image}
              alt=""
              className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-200"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-neutral dark:text-white/90">
                {mockUser.fullName}
              </p>
              <p className="mt-0.5 inline-flex rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                {mockUser.role}
              </p>
              <p className="mt-1 truncate text-xs text-neutral/80 dark:text-gray-400">
                {mockUser.email}
              </p>
              <p className="truncate text-xs text-neutral/80 dark:text-gray-400">
                {mockUser.phone}
              </p>
            </div>
          </div>

          <ul className="p-2" aria-label="User pages">
            {profileActions.map((action, index) => (
              <li key={action.label}>
                <Link
                  ref={index === 0 ? firstActionRef : undefined}
                  to={action.href}
                  role="menuitem"
                  onClick={() => closeMenu()}
                  className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors duration-200 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 dark:hover:bg-white/5"
                >
                  <span
                    className="text-brand-700 dark:text-brand-300"
                    aria-hidden="true"
                  >
                    {action.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-neutral dark:text-white/90">
                      {action.label}
                    </span>
                    <span className="block truncate text-xs text-neutral/75 dark:text-gray-400">
                      {action.description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-brand-100 p-2 dark:border-gray-800">
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-neutral transition-colors duration-200 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 dark:text-white/90 dark:hover:bg-white/5"
            >
              <FiLogOut
                size={18}
                className="text-brand-700 dark:text-brand-300"
                aria-hidden="true"
              />
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileDropdown;
