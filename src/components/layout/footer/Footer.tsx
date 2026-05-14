import type { ReactNode } from "react";
import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import BrandLogo from "@/components/common/BrandLogo";
import { FaSquareWhatsapp, FaThreads } from "react-icons/fa6";

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
  { label: "Home", href: "/" },
  { label: "Find Tuition", href: "/tuitions" },
  { label: "Login", href: "/login" },
  { label: "Create Account", href: "/signup" },
];

const supportLinks: FooterLink[] = [
  { label: "Teacher Profile", href: "/tutor/profile" },
  { label: "Teacher Dashboard", href: "/tutor" },
  { label: "Privacy Policy", href: "/" },
  { label: "Terms & Conditions", href: "/" },
];

const contactItems: FooterContact[] = [
  {
    label: "Phone",
    value: "+880 1330-912517",
    href: "tel:+8801330912517",
    icon: <FiPhone size={18} />,
  },
  {
    label: "Email",
    value: "support@tuitionmedia.com",
    href: "mailto:support@tuitionmedia.com",
    icon: <FiMail size={18} />,
  },
  {
    label: "Address",
    value: "Dhaka, Bangladesh",
    href: "https://maps.google.com",
    icon: <FiMapPin size={18} />,
  },
];

const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1HCKRY5Dtr/",
    icon: <FiFacebook size={18} />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/tutoriumbd?igsh=ODZ0a3BpYmVzOXVl",
    icon: <FiInstagram size={18} />,
  },
  {
    label: "Instagram",
    href: "https://www.threads.com/@tutoriumbd",
    icon: <FaThreads size={18} />,
  },
  {
    label: "Whatsapp",
    href: "https://wa.me/8801920296949?text=Hello%20Tutorium%20BD",
    icon: <FaSquareWhatsapp size={18} />,
  },
];

const navLinkClassName =
  "inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium text-text-strong transition-colors duration-200 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:hover:bg-brand-500/12 dark:hover:text-brand-200";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border from-surface to-brand-50/70 dark:from-surface-strong dark:to-surface border-t bg-linear-to-b transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <section>
            <Link
              to="/"
              aria-label="TutoriumBD home"
              className="focus-visible:ring-brand-400 inline-flex rounded-lg focus-visible:ring-2 focus-visible:outline-none"
            >
              <BrandLogo imgClassName="h-10 w-auto" />
            </Link>

            <p className="text-text-muted mt-3 max-w-xs text-sm leading-6">
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
                  className="tm-icon-button text-brand-700 dark:text-brand-300 min-h-11 min-w-11"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-poppins text-text-strong text-lg font-semibold">
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
            <h3 className="font-poppins text-text-strong text-lg font-semibold">
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
            <h3 className="font-poppins text-text-strong text-lg font-semibold">
              Contact
            </h3>
            <ul className="mt-3 space-y-2">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.label === "Address" ? "_blank" : undefined}
                    rel={item.label === "Address" ? "noreferrer" : undefined}
                    className="text-text-strong hover:bg-brand-50 hover:text-brand-700 focus-visible:ring-brand-400 dark:hover:bg-brand-500/12 dark:hover:text-brand-200 flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                  >
                    <span className="text-brand-600 dark:text-brand-300">
                      {item.icon}
                    </span>
                    <span>{item.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="border-border text-text-muted mt-8 flex flex-col items-start justify-between gap-3 border-t pt-5 text-sm sm:flex-row sm:items-center">
          <p>&copy; {year} TutoriumBD. All rights reserved.</p>
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
