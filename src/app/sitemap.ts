import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/getPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => {
    const date = post.frontmatter.date as string | undefined;
    return {
      url: `https://lokeshmvs.dev/blog/${post.slug}`,
      lastModified: date ? new Date(date) : new Date(),
    };
  });

  return [
    {
      url: "https://lokeshmvs.dev",
      lastModified: new Date(),
    },
    ...posts,
  ];
}
