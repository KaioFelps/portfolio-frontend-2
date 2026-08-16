import { common, createStarryNight } from "@wooorm/starry-night";
// @ts-expect-error this file DOES exist
import sourceTsx from "@wooorm/starry-night/source.tsx";
import { toDom } from "hast-util-to-dom";

const prefix = "language-";

type StarryNight = Awaited<ReturnType<typeof createStarryNight>>;

export class StarryNightSingletone {
  private static starryNight: StarryNight | null;

  public static async maybeInitialize() {
    if (!StarryNightSingletone.starryNight) {
      StarryNightSingletone.starryNight = await createStarryNight([
        ...common,
        sourceTsx,
      ]);
    }
  }

  private static async getOrInitalize(): Promise<StarryNight> {
    await StarryNightSingletone.maybeInitialize();
    return StarryNightSingletone.starryNight!;
  }

  public static async clientSideHighlight(nodes: Element[]) {
    const starryNight = await StarryNightSingletone.getOrInitalize();

    for (const node of nodes) {
      const language =
        node.classList
          .values()
          .find((_class) => _class.startsWith(prefix))
          ?.replace(prefix, "") ?? null;

      if (!language || !node.textContent) continue;

      const scope = starryNight.flagToScope(language);

      if (!scope) continue;

      const tree = starryNight.highlight(node.textContent, scope);
      const highlightedCode = toDom(tree, { fragment: true });

      node.replaceChildren(highlightedCode);
    }
  }
}
