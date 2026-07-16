import Link from "next/link";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/config/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo variant="stacked" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {siteConfig.description}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Operated by {siteConfig.legalName}. Educational publication — not a
            medical provider or product storefront.
          </p>
        </div>

        <FooterColumn title="Research" links={footerNav.research} />
        <FooterColumn title="Trust" links={footerNav.trust} />
        <FooterColumn title="Legal" links={footerNav.legal} />
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights
            reserved.
          </p>
          <p>
            <Link
              href="/affiliate-disclosure"
              className="underline-offset-2 hover:underline"
            >
              Affiliate relationships disclosed
            </Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
