import { getAllPosts } from "@/lib/getPosts";
import { Laptop, NotebookPen } from "lucide-react";
import Link from "next/link";

const experience = [
  {
    year: 2025,
    meta: "ongoing",
    role: "Technical Success Engineer",
    summary:
      "Storefront customizations and Easy Bundles landing pages — CSS, JS, and merchant branding across 500+ shops.",
    parts: [
      {
        label: "EasyBundles",
        href: "https://www.skailama.com/shopify-bundle-builder",
      },
      { label: " · Skailama" },
    ],
  },
  {
    year: 2024,
    meta: "",
    role: "Full-stack developer",
    summary:
      "Full-stack on dflow, an open-source PaaS for deploying on your own infra. Onboarding, docs, and product features (Next.js, Payload, MongoDB).",
    parts: [
      { label: "dflow", href: "https://dflow.sh" },
      { label: " · AES" },
    ],
  },
  {
    year: 2023,
    meta: "",
    role: "Frontend developer",
    summary:
      "Frontend on the RH concierge UI revamp — Next.js, TypeScript, GraphQL, Jotai.",
    parts: [
      { label: "RH", href: "https://rh.com/us/en/" },
      { label: " · CodexShark" },
    ],
  },
] as const;

function formatWritingDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  const month = date.toLocaleDateString("en-US", { month: "short" });
  return `${month}, ${date.getFullYear()}`;
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="page-shell min-h-dvh">
      <div className="page-column mx-auto flex w-full max-w-[640px] flex-col gap-14">
        <header className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-[1.35rem] font-medium tracking-tight text-pretty text-foreground">
              lokesh mvs
            </h1>
            <p className="text-muted">Frontend dev, learning design.</p>
            <p className="text-muted-soft">
              Visakhapatnam · Working from home
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="max-w-[65ch] text-foreground [&>p+p]:mt-[1.65em]">
              <p className="text-pretty">
                These days I&apos;m spending more time learning design — how
                interfaces feel, how type and space carry meaning, and how to
                make small details land better.
              </p>
              <p className="text-pretty">
                I like building things carefully, reading other people&apos;s
                work, and figuring out what &ldquo;good&rdquo; looks like one
                screen at a time.
              </p>
            </div>

            <p className="-mx-1 text-muted">
              <a className="tap-link px-1" href="mailto:lokeshmvs21@gmail.com">
                Email
              </a>
              <span className="text-muted-soft">·</span>
              <a
                className="tap-link px-1"
                href="https://www.linkedin.com/in/lokesh-mvs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <span className="text-muted-soft">·</span>
              <a
                className="tap-link px-1"
                href="https://github.com/malla-lokesh"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </p>
          </div>
        </header>

        <section
          className="flex flex-col gap-3"
          aria-labelledby="experience-heading"
        >
          <h2
            id="experience-heading"
            className="flex items-center gap-1.5 text-[0.85rem] font-normal tracking-wide text-muted-soft"
          >
            <Laptop
              aria-hidden="true"
              className="pointer-events-none size-3.5 shrink-0 translate-y-px select-none"
              strokeWidth={1.75}
            />
            Experience
          </h2>
          <ul className="flex flex-col gap-8">
            {experience.map((item) => (
              <li
                key={item.year + item.parts[0].label}
                className="grid grid-cols-[3.25rem_1fr_auto] items-baseline gap-x-3"
              >
                <span className="text-muted-soft tabular-nums">{item.year}</span>
                <div className="flex min-w-0 flex-col gap-1.5 justify-self-start">
                  <div className="flex flex-col gap-0.5">
                    <div className="text-foreground">
                      {item.parts.map((part) =>
                        "href" in part && part.href ? (
                          <a
                            key={part.label}
                            href={part.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="list-link tap-link -mx-1 px-1"
                          >
                            {part.label}
                          </a>
                        ) : (
                          <span key={part.label} className="text-muted">
                            {part.label}
                          </span>
                        )
                      )}
                    </div>
                    <p className="text-muted">{item.role}</p>
                  </div>
                  <p className="max-w-[65ch] text-[0.9rem] text-pretty text-muted-soft">
                    {item.summary}
                  </p>
                </div>
                <span className="justify-self-end text-muted-soft">
                  {item.meta}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {posts.length > 0 ? (
          <section
            className="flex flex-col gap-3"
            aria-labelledby="writing-heading"
          >
            <h2
              id="writing-heading"
              className="flex items-center gap-1.5 text-[0.85rem] font-normal tracking-wide text-muted-soft"
            >
              <NotebookPen
                aria-hidden="true"
                className="pointer-events-none size-3.5 shrink-0 translate-y-px select-none"
                strokeWidth={1.75}
              />
              Writing
            </h2>
            <ul className="flex flex-col gap-7">
              {posts.map((post) => {
                const title =
                  (post.frontmatter.title as string | undefined) ?? post.slug;
                const description = post.frontmatter.description as
                  | string
                  | undefined;
                const date = post.frontmatter.date as string | undefined;

                return (
                  <li
                    key={post.slug}
                    className="grid grid-cols-[1fr_auto] items-baseline gap-x-3"
                  >
                    <div className="flex min-w-0 flex-col gap-1 justify-self-start">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="list-link tap-link -mx-1 w-fit px-1"
                      >
                        {title}
                      </Link>
                      {description ? (
                        <p className="max-w-[65ch] text-[0.9rem] text-pretty text-muted-soft">
                          {description}
                        </p>
                      ) : null}
                    </div>
                    <span className="justify-self-end text-muted-soft">
                      {date ? formatWritingDate(date) : ""}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}
