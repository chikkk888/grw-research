import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { ReactNode } from "react";
import { slugifyHeading } from "@/components/article/TableOfContents";

function heading(level: 2 | 3) {
  const Tag = `h${level}` as const;
  return function Heading({ children }: { children?: ReactNode }) {
    const text = extractText(children);
    const id = slugifyHeading(text);
    return <Tag id={id}>{children}</Tag>;
  };
}

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    const element = node as { props?: { children?: ReactNode } };
    return extractText(element.props?.children);
  }
  return "";
}

const components = {
  h2: heading(2),
  h3: heading(3),
  a: function MdxAnchor({
    href = "#",
    children,
  }: {
    href?: string;
    children?: ReactNode;
  }) {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className="text-accent underline underline-offset-3">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-3"
      >
        {children}
      </a>
    );
  },
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-article">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
