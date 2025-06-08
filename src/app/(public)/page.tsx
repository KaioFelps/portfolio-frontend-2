import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <main className="flex-1 w-[calc(100%_-_24px)] max-w-main mx-auto flex flex-col items-center justify-center">
        <h1 className="colorful-main-title mb-10 text-center">Kaio Felipe</h1>

        <h2 className="mb-12 font-black text-3xl text-center text-balance max-w-[500px] text-yellow-900 lowercase">
          Desenvolvedor full-stack, cientista da computação, engenheiro de
          software ou alguma coisa do tipo
        </h2>

        <a
          className="group btn default text-lg font-semibold uppercase"
          href="/projetos"
        >
          <span className="max-2xs:hidden">Confira meus</span> projetos
          <ArrowRightIcon
            size="20"
            weight="bold"
            className="ml-4 translate-x-0 group-hover:translate-x-1 transition-all duration-150 ease-in"
          />
        </a>
      </main>
    </>
  );
}
