import Image from "next/image";
import Link from "next/link";

export default function TitleBar() {
  return (
    <header className="py-4 px-4 sm:px-10">
      <nav className="flex justify-between items-center">
        <Link
          href="/"
          className="text-base rounded-md bg-secondary py-2 px-3 font-bold text-primary transition-colors hover:text-accent"
        >
          Job Decoder
        </Link>
        <a href="https://github.com/anubhavgh023/job_decoder" target="_blank">
          <Image
            src="/icons/github.svg"
            width={36}
            height={36}
            alt="github icon"
            className="hover:scale-110 p-2 bg-secondary border-spacing-2 rounded-full"
          />
        </a>
      </nav>
    </header>
  );
}
