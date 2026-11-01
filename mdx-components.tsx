import type { MDXComponents } from "mdx/types";
import Gallery from "@/components/Gallery";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mt-8 mb-3 text-xl font-medium tracking-tight text-pretty">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-7 mb-2 text-lg font-medium tracking-tight text-pretty">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 mb-2 text-[0.95rem] font-medium tracking-tight text-pretty text-foreground">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-5 mb-2 text-[0.95rem] font-medium text-pretty">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="mt-4 mb-2 text-[0.95rem] font-medium text-pretty">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="mt-4 mb-2 text-[0.95rem] font-medium text-pretty">
      {children}
    </h6>
  ),
  p: ({ children }) => (
    <p className="text-pretty text-foreground">{children}</p>
  ),
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-[1.65em] flex list-disc flex-col gap-1 pl-5">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-[1.65em] flex list-decimal flex-col gap-1 pl-5">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  Gallery,
};

export default components;
