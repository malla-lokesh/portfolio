import { getPostBySlug } from "@/lib/getPosts";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import fs from "fs";
import path from "path";
import components from "../../../../mdx-components";

export async function generateStaticParams() {
  const slugs = fs
    .readdirSync(path.join(process.cwd(), "src/content/posts"))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
  return slugs;
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const page = await params;
  const { content } = getPostBySlug(page.slug);

  return (
    <article className="p-10 max-w-5xl mx-auto">
      <MDXRemote source={content} components={components} />
    </article>
  );
}
