import type { Metadata } from "next";
import { Main } from "@/component/main";
import SectionHeader from "@/component/section-header";
import { SocialMedias } from "@/config/social-media";
import { getYearsFromNow } from "@/utils/index";
import { MetaUtilities } from "@/utils/meta";

const myBirthday = new Date("07/17/2005");
const startedStudyingAt = new Date("01/01/2022");

export const metadata: Metadata = {
  title: await MetaUtilities.getTitle("Sobre mim"),
  alternates: { canonical: await MetaUtilities.getCanonicalUrl("/sobre") },
};

export default function AboutMePage() {
  const myAge = getYearsFromNow(myBirthday);
  const yearsStudying = getYearsFromNow(startedStudyingAt);

  return (
    <Main className="max-w-sm">
      <SectionHeader.Root className="justify-center mb-16">
        <SectionHeader.Heading>Sobre Mim</SectionHeader.Heading>
      </SectionHeader.Root>

      <div className="prose-p:mb-6 prose-p:last:mb-0 prose-p:text-xl text-balance text-center">
        <p>
          Tenho {myAge} anos. Hoje, sou um graduando em Ciência da Computação
          pela UTFPR-CM. Há {yearsStudying} anos, venho estudando e me
          aprofundando cada vez mais em ambos os polos do desenvolvimento web —
          front e back-end.
        </p>

        <p>
          Apesar de não ter experiência profissional, já fiz alguns{" "}
          <a href="/projetos" className="link">
            projetos
          </a>
          ! Você pode conferir tudo e mais um pouco no meu{" "}
          <a href={SocialMedias.github} target="_blank" rel="noreferrer">
            github
          </a>
          .
        </p>
      </div>
    </Main>
  );
}
