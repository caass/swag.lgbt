import Link from "next/link";
import type { ComponentPropsWithRef, FunctionComponent } from "react";

type LinkGroup = {
  text: string;
  href: string;
}[];

/**
 * lol like "linked list" except stupider and i made it a component for the pun
 */
export const LinkList: FunctionComponent<
  ComponentPropsWithRef<"ul"> & { links: LinkGroup }
> = ({ links, children, ...props }) => {
  return (
    <ul {...props}>
      {links.map(({ text, href }) => (
        <li key={`${text.split(/\s/).join("-")}`}>
          <Link href={href}>{text}</Link>
        </li>
      ))}
      {children}
    </ul>
  );
};
