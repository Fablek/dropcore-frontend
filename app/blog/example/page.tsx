import { title } from "@/components/primitives";

export default function ExampleBlogPost() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-4">
      <h1
        className={`${title()} bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}
      >
        Example Blog Post
      </h1>
      <p className="text-sm text-muted-foreground italic">June 15, 2025</p>

      <p className="mt-6 text-xl font-light leading-relaxed text-gray-600 dark:text-gray-300">
        Dive into this sample post, designed not only for structure testing but
        to inspire the look and feel of real content. Make it your own.
      </p>

      <hr className="my-8 border-t border-muted" />

      <h2 className="mt-10">Section Heading</h2>
      <p>
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
        cubilia curae; <strong>Sed congue</strong>, eros non luctus varius,
        augue justo tincidunt nulla, sed placerat sem nisi at erat.
      </p>

      <blockquote className="border-l-4 pl-4 italic text-muted-foreground">
        “Design isn’t just what it looks like and feels like. Design is how it
        works.” – Steve Jobs
      </blockquote>

      <h2 className="mt-10">Another Section</h2>
      <p>
        Nulla facilisi. Phasellus commodo neque ac ante faucibus, non
        ullamcorper lectus bibendum. Mauris et metus vitae arcu tristique
        malesuada.
      </p>

      <div className="bg-muted/30 p-4 rounded-xl mt-6 shadow-inner">
        <p className="m-0 text-sm text-muted-foreground">
          This is just a placeholder post used for design and layout purposes.
          All blog links point here for now.
        </p>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Liked what you read?</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/blog"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium shadow hover:scale-105 transition-transform"
          >
            ← Back to Blog
          </a>
          <a
            href="/newsletter"
            className="inline-block border border-muted-foreground px-6 py-3 rounded-full font-medium text-muted-foreground hover:bg-muted/20 transition-colors"
          >
            Subscribe for Updates
          </a>
        </div>
      </div>
    </article>
  );
}
