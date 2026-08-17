export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const primaryNav: NavItem[] = [
  { label: "Research Library", href: "/research" },
  { label: "BPC-157", href: "/research/bpc-157" },
  { label: "TB-500", href: "/research/tb-500" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  research: [
    { label: "Research Library", href: "/research" },
    { label: "BPC-157 Guide", href: "/research/bpc-157" },
    { label: "TB-500 Guide", href: "/research/tb-500" },
    { label: "CJC-1295", href: "/research/cjc-1295" },
    { label: "Ipamorelin", href: "/research/ipamorelin" },
  ],
  trust: [
    { label: "About", href: "/about" },
    { label: "Editorial Policy", href: "/editorial-policy" },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    { label: "Medical Disclaimer", href: "/medical-disclaimer" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
