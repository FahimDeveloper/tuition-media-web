import type {ReactNode} from 'react';
import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';
import {NavLink} from 'react-router-dom';

type FooterLink = {
  label: string;
  href: string;
};

type FooterContact = {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
};

type SocialLink = {
  label: string;
  href: string;
  icon: ReactNode;
};

const quickLinks: FooterLink[] = [
  {label: 'Home', href: '/'},
  {label: 'Find Tuition', href: '/tuition'},
  {label: 'Login', href: '/login'},
  {label: 'Create Account', href: '/signup'},
];

const supportLinks: FooterLink[] = [
  {label: 'Teacher Profile', href: '/dashboard/profile'},
  {label: 'Dashboard', href: '/dashboard'},
  {label: 'Privacy Policy', href: '/'},
  {label: 'Terms & Conditions', href: '/'},
];

const contactItems: FooterContact[] = [
  {
    label: 'Phone',
    value: '+880 1700-000000',
    href: 'tel:+8801700000000',
    icon: <FiPhone size={18} />,
  },
  {
    label: 'Email',
    value: 'support@tuitionmedia.com',
    href: 'mailto:support@tuitionmedia.com',
    icon: <FiMail size={18} />,
  },
  {
    label: 'Address',
    value: 'Dhaka, Bangladesh',
    href: 'https://maps.google.com',
    icon: <FiMapPin size={18} />,
  },
];

const socialLinks: SocialLink[] = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: <FiFacebook size={18} />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: <FiInstagram size={18} />,
  },
];

const navLinkClassName =
  'inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium text-text-strong transition-colors duration-200 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white/90';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-200/70 bg-linear-to-b from-surface to-brand-50/70 transition-colors duration-300 dark:border-gray-800 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <section>
            <h2 className="font-poppins text-2xl font-extrabold tracking-tight text-text-strong">
              Tuition <span className="text-brand-600 dark:text-brand-300">Media</span>
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-text-strong/85">
              Connect students, guardians, and tutors in one trusted
              marketplace. Find the right match faster with a simple and guided
              flow.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 transition-colors duration-200 hover:border-brand-400 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-gray-800 dark:bg-white/[0.03] dark:text-brand-300 dark:hover:border-brand-400 dark:hover:bg-white/[0.06] dark:hover:text-brand-200"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-poppins text-lg font-semibold text-text-strong">
              Quick Links
            </h3>
            <nav
              aria-label="Footer navigation"
              className="mt-3 flex flex-col gap-1"
            >
              {quickLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  className={navLinkClassName}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </section>

          <section>
            <h3 className="font-poppins text-lg font-semibold text-text-strong">
              Support
            </h3>
            <nav
              aria-label="Support links"
              className="mt-3 flex flex-col gap-1"
            >
              {supportLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  className={navLinkClassName}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </section>

          <section>
            <h3 className="font-poppins text-lg font-semibold text-text-strong">
              Contact
            </h3>
            <ul className="mt-3 space-y-2">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.label === 'Address' ? '_blank' : undefined}
                    rel={item.label === 'Address' ? 'noreferrer' : undefined}
                    className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-strong transition-colors duration-200 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white/90"
                  >
                    <span className="text-brand-600 dark:text-brand-300">{item.icon}</span>
                    <span>{item.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-brand-200/70 pt-5 text-sm text-text-strong/80 sm:flex-row sm:items-center dark:border-gray-800 dark:text-gray-400">
          <p>&copy; {year} Tuition Media. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            <NavLink to="/" className={navLinkClassName}>
              Privacy
            </NavLink>
            <NavLink to="/" className={navLinkClassName}>
              Terms
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
