import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#131313] text-white py-8 mt-24">
      <div className="flex justify-between items-center ml-8 mr-8">
        <p className="text-sm text-[#f3fcdc]">© {new Date().getFullYear()}JobDecoder</p>
        <div>
          <div className="flex gap-4">
            {/* github */}
            <a
              href="https://github.com/anubhavgh023/job_decoder"
              target="_blank"
            >
              <Image
                src="/icons/github.svg"
                width={36}
                height={36}
                alt="github icon"
                className="hover:scale-110 p-2 bg-secondary rounded-md"
              ></Image>
            </a>

            {/* linkedin */}
            <a
              href="https://github.com/anubhavgh023/job_decoder"
              target="_blank"
            >
              <Image
                src="/icons/linkedin.svg"
                width={36}
                height={36}
                alt="linkedin icon"
                className="hover:scale-110 p-2 bg-secondary rounded-md"
              ></Image>
            </a>
            {/* twitter */}
            <a
              href="https://twitter.com/anubhavs_twt"
              target="_blank"
            >
              <Image
                src="/icons/twitter.svg"
                width={36}
                height={36}
                alt="linkedin icon"
                className="hover:scale-110 p-2 bg-secondary rounded-md"
              ></Image>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
