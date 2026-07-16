import { getHub } from "@/config/hubs";
import type { BreadcrumbItem } from "@/types/content";

export function generateBreadcrumbs(
  category: string,
  title: string,
  href: string,
): BreadcrumbItem[] {
  const hub = getHub(category);
  const crumbs: BreadcrumbItem[] = [{ name: "Home", href: "/" }];

  if (hub) {
    crumbs.push({ name: hub.title, href: hub.href });
  } else {
    crumbs.push({
      name: category
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
      href: `/${category}`,
    });
  }

  crumbs.push({ name: title, href });
  return crumbs;
}
