import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export function HeroHome() {
  return (
    <>
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
    </>
  );
}
