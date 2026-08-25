import { common, createStarryNight } from "@wooorm/starry-night";
import sourceTsx from "@wooorm/starry-night/source.tsx";
import { toDom } from "hast-util-to-dom";

const prefix = "language-";

type StarryNight = Awaited<ReturnType<typeof createStarryNight>>;

export class StarryNightSingleton {
  private static starryNight: StarryNight | null;

  public static async maybeInitialize() {
    if (!StarryNightSingleton.starryNight) {
      StarryNightSingleton.starryNight = await createStarryNight([
        ...common,
        sourceTsx,
      ]);
    }
  }

  private static async getOrInitalize(): Promise<StarryNight> {
    await StarryNightSingleton.maybeInitialize();
    return StarryNightSingleton.starryNight!;
  }

  /**
   * Synchronous accessor for use inside ProseMirror plugin state (which
   * can't await anything). Returns `null` until `maybeInitialize()` has
   * resolved at least once — pair with `useStarryNightHighlighter()`.
   */
  public static getSync(): StarryNight | null {
    return StarryNightSingleton.starryNight ?? null;
  }

  public static async clientSideHighlight(nodes: Element[]) {
    const starryNight = await StarryNightSingleton.getOrInitalize();

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
