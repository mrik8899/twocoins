'use client';

import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/TwoCoins.corp.dvo",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/twocoinsvehicles",
    label: "Instagram",
  },
];

const contactInfo = [
  {
    icon: Phone,
    text: "+63 939 213 6599",
    href: "tel:+639392136599",
  },
  {
    icon: Mail,
    text: "info@twocoins.com",
    href: "mailto:info@twocoins.com",
  },
  {
    icon: MapPin,
    text: "Astorga Sta. Cruz Davao Del Sur, Philippines.",
    href: "https://maps.google.com/?q=Davao, Philippines",
  },
];

const Footer = () => {
  return (
    <footer
      className="relative scroll-mt-20 pt-20 pb-10 min-h-[300px] transition-colors duration-300 overflow-hidden"
    >
      {/* Blobs and vertical gradient overlay identical to Features/Contact */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-yellow-500/20 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-primary-500/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        {/* Left: Brand + Slogan */}
        <div className="text-left w-full md:w-1/3">
          <span className="text-2xl font-extrabold text-white tracking-wide">
            Two Coins{" "}
            <span className="text-yellow-400">
              Corporation
            </span>
          </span>
          <p className="mt-2 text-white/90 text-base">
            Connecting you with quality vehicles, worldwide.
          </p>
        </div>

        {/* Middle: Contact Info */}
        <div className="flex flex-col gap-2 w-full md:w-1/3 md:items-center">
          {contactInfo.map(({ icon: Icon, text, href }, idx) => (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-yellow-400 transition"
              aria-label={text}
            >
              <Icon className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">{text}</span>
            </a>
          ))}
        </div>

        {/* Right: Social + Legal Links */}
        <div className="flex flex-col gap-4 w-full md:w-1/3 md:items-end">
          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-full bg-white/10 dark:bg-black/20 border border-white/20 shadow hover:bg-yellow-400 hover:text-black transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          {/* Legal Links */}
          <div className="flex gap-4 text-xs text-gray-200">
            <a
              href="#"
              className="hover:text-yellow-400 transition"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-yellow-400 transition"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Divider & Bottom Bar */}
      <div className="border-t mt-8 pt-6 border-white/20 text-center text-gray-200 text-xs relative z-10">
        © {new Date().getFullYear()} Two Coins Corporation. All rights reserved.
      </div>

      {/* Blob animation keyframes (if not already in your global CSS) */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.1, 0.9) translate(20px, -10px); }
          66% { transform: scale(0.9, 1.1) translate(-10px, 20px); }
        }
        .animate-blob { animation: blob 12s infinite linear; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </footer>
  );
};

export default Footer;