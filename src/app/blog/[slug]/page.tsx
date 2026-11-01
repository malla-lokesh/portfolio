import { getPostBySlug } from "@/lib/getPosts";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import components from "../../../../mdx-components";

export async function generateStaticParams() {
  const slugs = fs
    .readdirSync(path.join(process.cwd(), "src/content/posts"))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = getPostBySlug(slug);
  const title = (frontmatter.title as string | undefined) ?? slug;
  const description = frontmatter.description as string | undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://lokeshmvs.dev/blog/${slug}`,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = await params;
  const { content, frontmatter } = getPostBySlug(page.slug);
  const title = (frontmatter.title as string | undefined) ?? page.slug;
  const date = frontmatter.date as string | undefined;

  return (
    <main className="page-shell min-h-dvh">
      <div className="relative mx-auto w-full max-w-[640px]">
        <div className="pointer-events-none absolute top-0 bottom-0 right-full mr-5 hidden lg:block">
          <Link
            href="/"
            className="pointer-events-auto sticky top-[var(--page-pad-top)] inline-flex whitespace-nowrap py-2 text-muted-soft no-underline transition-colors duration-150 ease-out hover:text-foreground hover:underline"
          >
            ← back
          </Link>
        </div>

        <article className="page-column flex flex-col gap-8">
          <Link
            href="/"
            className="-mx-1 inline-flex w-fit whitespace-nowrap px-1 py-2 text-muted-soft no-underline transition-colors duration-150 ease-out hover:text-foreground hover:underline lg:hidden"
          >
            ← back
          </Link>
          <header className="flex flex-col gap-1">
            <h1 className="text-[1.35rem] font-medium tracking-tight text-pretty">
              {title}
            </h1>
            {date ? (
              <p className="text-muted-soft tabular-nums">
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            ) : null}
          </header>
          <div className="flex max-w-[65ch] flex-col [&>p+p]:mt-[1.65em] [&>h3+p]:mb-0">
            <MDXRemote source={content} components={components} />
          </div>
        </article>
      </div>
    </main>
  );
}
