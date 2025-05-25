import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

import { FaCheck } from "react-icons/fa";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>DropCore&nbsp;</span>
        <span className={title({ color: "violet" })}>gives you&nbsp;</span>
        <br />
        <span className={title()}>control over your cloud storage.</span>
        <div className={subtitle({ class: "mt-4" })}>
          Private, simple, and built with microservices.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <section className="py-16 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Choose your plan</h2>
        <p className="text-gray-500 mb-12">Simple pricing. No hidden fees.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="border rounded-2xl p-6 shadow-sm">
            <h3 className="text-2xl font-semibold mb-2">Free</h3>
            <p className="text-gray-600 mb-4">Ideal for personal use</p>
            <p className="text-3xl font-bold mb-6">$0<span className="text-base font-normal">/mo</span></p>
            <ul className="text-left space-y-2 mb-6 text-sm">
              <li className="flex items-center gap-2"><FaCheck /> 5 GB storage</li>
              <li className="flex items-center gap-2"><FaCheck /> File upload & preview</li>
              <li className="flex items-center gap-2"><FaCheck /> Basic support</li>
            </ul>
            <Link href="/signup" className={buttonStyles({ color: "primary", radius: "full", fullWidth: true })}>
              Get Started
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="border-2 border-violet-500 rounded-2xl p-6 shadow-md">
            <h3 className="text-2xl font-semibold mb-2">Pro</h3>
            <p className="text-gray-700 mb-4">For advanced users</p>
            <p className="text-3xl font-bold mb-6">$9<span className="text-base font-normal">/mo</span></p>
            <ul className="text-left space-y-2 mb-6 text-sm">
              <li className="flex items-center gap-2"><FaCheck /> 100 GB storage</li>
              <li className="flex items-center gap-2"><FaCheck /> Priority support</li>
              <li className="flex items-center gap-2"><FaCheck /> Advanced file search</li>
            </ul>
            <Link href="/signup" className={buttonStyles({ color: "primary", variant: "shadow", radius: "full", fullWidth: true })}>
              Upgrade Now
            </Link>
          </div>

          {/* Self-host Plan */}
          <div className="border rounded-2xl p-6 shadow-sm">
            <h3 className="text-2xl font-semibold mb-2">Self-host</h3>
            <p className="text-gray-600 mb-4">Host it on your own server</p>
            <p className="text-3xl font-bold mb-6">Free</p>
            <ul className="text-left space-y-2 mb-6 text-sm">
              <li className="flex items-center gap-2"><FaCheck /> Unlimited storage (your hardware)</li>
              <li className="flex items-center gap-2"><FaCheck /> Full control</li>
              <li className="flex items-center gap-2"><FaCheck /> Open-source</li>
            </ul>
            <Link href={siteConfig.links.github} className={buttonStyles({ variant: "bordered", radius: "full", fullWidth: true })}>
              View on GitHub
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
