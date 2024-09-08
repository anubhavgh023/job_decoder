"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TitleBar() {
  const pathname = usePathname();

  return (
    <header className="py-4 px-4 sm:px-10">
      <nav className="flex justify-between items-center">
        <div className="flex gap-4">
          <Link
            href="/"
            className="text-base rounded-md bg-secondary py-2 px-3 font-bold text-primary transition-colors hover:text-foreground"
          >
            Job Decoder
          </Link>
          {/* Conditionally render the Start Search link */}
          {pathname === "/dashboard" && (
            <Link
              href="/search"
              className="bg-primary text-primary-foreground py-2 px-6 rounded-md hover:bg-foreground hover:text-background active:scale-95 transition-colors"
            >
              Start Search
            </Link>
          )}
        </div>
        <a href="https://github.com/anubhavgh023/job_decoder" target="_blank">
          <Image
            src="/icons/github.svg"
            width={36}
            height={36}
            alt="github icon"
            className="hover:scale-110 p-2 bg-secondary border-spacing-2 rounded-md"
          />
        </a>
      </nav>
    </header>
  );
}
