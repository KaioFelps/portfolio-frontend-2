import { Main } from "@/component/main";
import { SocialMedias } from "@/config/social-media";
import { getYearsFromNow } from "@/utils/index";
import clsx from "clsx";

export default function AboutMePage() {
  const myBirthday = new Date("07/17/2005");
  const myAge = getYearsFromNow(myBirthday);

  const startedStudyingAt = new Date("01/01/2022");
  const yearsStudying = getYearsFromNow(startedStudyingAt);

  return (
    <Main className="max-w-sm">
      <h1
        className={clsx(
          "text-5xl font-bold text-center w-full px-12 pb-6 border-b",
          "border-gray-300 dark:border-d-gray-300 mb-16",
        )}
      >
        Sobre Mim
      </h1>

      <div className="prose-p:mb-6 prose-p:last:mb-0 prose-p:text-xl text-balance text-center">
        <p>
          Tenho {myAge} anos. Hoje, sou um graduando em Ciência da Computação
          pela UTFPR-CM. Há {yearsStudying}
          anos, venho estudando e me aprofundando cada vez mais em ambos os
          polos do desenvolvimento web — front e back-end.
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
