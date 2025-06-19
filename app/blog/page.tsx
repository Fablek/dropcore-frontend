import { title } from "@/components/primitives";
import Link from "next/link";

const posts = [
  {
    title: "How to self-host Dropcore in under 10 minutes",
    excerpt:
      "A step-by-step guide for deploying Dropcore on your own VPS using Docker.",
    date: "2025-06-15",
    slug: "example",
  },
  {
    title: "Why file versioning matters in cloud storage",
    excerpt:
      "Learn how versioning improves reliability and peace of mind when storing sensitive files.",
    date: "2025-06-02",
    slug: "example",
  },
  {
    title: "Introducing Dropcore Pro – What's new?",
    excerpt:
      "Take a look at all the latest features included in our new Pro plan.",
    date: "2025-05-20",
    slug: "example",
  },
];

export default function BlogPage() {
  return (
    <section className="px-4 max-w-4xl mx-auto space-y-10">
      <div className="text-center">
        <h1 className={title()}>Blog</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Insights, updates, and technical deep dives from the Dropcore team.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {posts.map((post, index) => (
          <Link key={`${post.slug}-${index}`} href={`/blog/${post.slug}`}>
            <article className="group p-6 rounded-xl border border-default-200 bg-background hover:bg-muted/30 transition-all shadow-sm hover:shadow-lg flex flex-col gap-2 h-full">
              <h2 className="text-lg sm:text-xl font-semibold group-hover:text-secondary transition">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground">{post.date}</p>
              <p className="text-sm text-default-600 line-clamp-3">
                {post.excerpt}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
