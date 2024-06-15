import { Link } from "react-router-dom";
import { GitHubIcon } from "@/components/icons/github";
import { HTMLAttributeAnchorTarget } from "react";

export function Header() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Link to="/">
          <img src="./favicon.svg" alt="Cervello" className="h-8 w-auto" />
        </Link>
        <div className="ml-auto flex">
          <HeaderLink to="/">Calculator</HeaderLink>
          <HeaderLink to="/eligibility">Eligibility</HeaderLink>
          <HeaderLink
            to="https://github.com/LucaDiba/rientro-cervelli"
            target="_blank"
          >
            <GitHubIcon />
          </HeaderLink>
        </div>
      </header>
    </div>
  );
}

function HeaderLink({
  to,
  target,
  children,
}: {
  to: string;
  target?: HTMLAttributeAnchorTarget;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      target={target}
      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
    >
      {children}
    </Link>
  );
}
