import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Hero Section with Image */}
      <section id="hero" className="flex flex-col items-center justify-center">
        <div className="text-center m-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[hsl(85,100%,70%)] to-[hsl(169,40%,67%)] bg-clip-text text-transparent m-4 mb-2">
            Discover and Analyze Remote Job Opportunities
          </h1>
          <p className="text-lg text-foreground mb-12 m-4">
            Uncover the best remote positions tailored to your skills and
            aspirations.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row justify-center items-center">
            <Link
              href="/search"
              className="bg-primary w-full sm:w-56 text-primary-foreground py-2 px-6 rounded-md hover:bg-foreground hover:text-background active:scale-95 transition-colors"
            >
              Start Searching
            </Link>
            <Link
              href="/dashboard"
              className="bg-transparent w-full sm:w-56 border border-primary text-primary py-2 px-6 rounded-md hover:bg-foreground hover:border-background hover:text-primary-foreground 
              active:scale-95
              transition-colors"
            >
              Dashboard Analytics
            </Link>
          </div>
        </div>

        {/* Dashboard Image */}
        <div className="relative flex items-center justify-center text-center mb-8 sm:h-[48rem] w-full bg-dot-[#c1ff68]/[0.3] p-8">
          {/* Radial gradient to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

          <div className="relative bg-secondary p-2 rounded-md">
            <Image
              src="/assets/dashboard-dark.svg"
              width={1024}
              height={1024}
              alt="dashboard preview image"
            ></Image>
          </div>
        </div>
      </section>
    </main>
  );
}
