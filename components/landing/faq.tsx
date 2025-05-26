"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";

export function Faq() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <section className="py-16 px-4 w-6xl mx-auto max-w-5xl w-full">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-500 mb-10">
          Everything you need to know before getting started with your personal
          cloud drive.
        </p>
      </div>

      <Accordion>
        <AccordionItem
          key="1"
          aria-label="How much storage do I get for free?"
          title="How much storage do I get for free?"
        >
          Every user who signs up gets 1 GB of free cloud storage — no credit
          card required. This space is yours to use for any type of personal
          files: documents, photos, notes, and more. If you need more, you can
          always upgrade later.
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Can I preview files without downloading them?"
          title="Can I preview files without downloading them?"
        >
          Yes! Our app comes with a built-in text editor and image viewer, so
          you can preview .txt, .md, .jpg, .png, and .gif files directly in your
          browser. It’s fast, smooth, and works on desktop and mobile.
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Is my data private and secure?"
          title="Is my data private and secure?"
        >
          Absolutely. We take your privacy seriously. All file transfers use
          end-to-end encrypted HTTPS connections, and your files are stored in a
          secure, access-controlled environment. Only you can access your data —
          we never scan, sell, or share your files.
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="What file types are supported?"
          title="What file types are supported?"
        >
          You can upload any type of file, just like a regular drive. While you
          can store everything from PDFs to ZIPs, our web-based preview feature
          currently supports text and image files. We're working on adding
          support for more formats soon.
        </AccordionItem>
        <AccordionItem
          key="5"
          aria-label="Can I upgrade my storage later?"
          title="Can I upgrade my storage later?"
        >
          Yes — we offer flexible plans to suit your needs. You can upgrade your
          account at any time to unlock more space, advanced features like
          folder sharing, and priority support. Upgrading is quick and doesn’t
          affect your existing files.
        </AccordionItem>
        <AccordionItem
          key="6"
          aria-label="Can I share my files with others?"
          title="Can I share my files with others?"
        >
          This feature is coming soon! We’re building secure, link-based sharing
          that will let you share files or folders with others — with optional
          password protection and expiration dates.
        </AccordionItem>
        <AccordionItem
          key="7"
          aria-label="Do I need to install any software?"
          title="Do I need to install any software?"
        >
          No installations needed. Everything runs 100% in the browser, whether
          you’re on Windows, macOS, Linux, iOS, or Android. Just log in, upload,
          and access your files anywhere.
        </AccordionItem>
        <AccordionItem
          key="8"
          aria-label="What happens if I run out of space?"
          title="What happens if I run out of space?"
        >
          If you reach your storage limit, you'll still be able to access and
          download your files — but uploading new files will be paused. You can
          either free up space by deleting old files or upgrade your storage to
          continue.
        </AccordionItem>
      </Accordion>
    </section>
  );
}
