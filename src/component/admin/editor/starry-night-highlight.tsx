import { Extension } from "@tiptap/core";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { StarryNightSingleton } from "@/lib/starry-night";

interface HastNode {
  type: string;
  value?: string;
  properties?: { className?: string[] };
  children?: HastNode[];
}

interface HastRoot extends HastNode {
  type: "root";
  children: HastNode[];
}

function getHighlightNodes(result: HastRoot | HastNode | null): HastNode[] {
  if (!result) return [];
  return result.type === "root" ? (result as HastRoot).children : [result];
}

function flattenHastNodes(
  nodes: HastNode[],
  classNames: string[] = [],
): Array<{ text: string; classNames: string[] }> {
  return nodes.flatMap((node) => {
    if (node.type === "text") {
      return [{ text: node.value ?? "", classNames }];
    }

    const nextClassNames = [
      ...classNames,
      ...(node.properties?.className ?? []),
    ];

    if (node.children) {
      return flattenHastNodes(node.children, nextClassNames);
    }

    return [];
  });
}

function getDecorations(doc: ProseMirrorNode): DecorationSet {
  // Read the highlighter fresh, every time. While it's still loading
  // (async, first render) this is `null` and we simply render no
  // decorations yet — no awaiting, no blocking, nothing that could touch
  // the editable DOM out of band.
  const highlighter = StarryNightSingleton.getSync();
  if (!highlighter) return DecorationSet.empty;

  const decorations: Decoration[] = [];

  doc.descendants((node, pos) => {
    if (node.type.name !== "codeBlock") return;

    const language: string | undefined = node.attrs.language;
    if (!language) return;

    const scope = highlighter.flagToScope(language);
    if (!scope) return;

    let result: HastRoot | null = null;
    try {
      result = highlighter.highlight(node.textContent, scope);
    } catch {
      return;
    }

    let from = pos + 1;

    for (const { text, classNames } of flattenHastNodes(
      getHighlightNodes(result),
    )) {
      const to = from + text.length;

      if (classNames.length > 0) {
        decorations.push(
          Decoration.inline(from, to, { class: classNames.join(" ") }),
        );
      }

      from = to;
    }
  });

  return DecorationSet.create(doc, decorations);
}

export const starryNightHighlightPluginKey = new PluginKey<DecorationSet>(
  "starryNightHighlight",
);

/**
 * Highlights `codeBlock` nodes using Starry Night, applied as ProseMirror
 * decorations — the same strategy `@tiptap/extension-code-block-lowlight`
 * uses. Decorations are owned and diffed by ProseMirror itself, so typing
 * inside a highlighted block never fights the editor for the DOM and the
 * cursor never jumps. Compare with `hooks/use-starry-night.ts`, which
 * mutates the DOM directly via `replaceChildren` — fine for a static,
 * read-only rendering, but unsafe inside an editable surface (that's what
 * was resetting your cursor).
 *
 * Call `StarryNightSingletone.maybeInitialize()` once (e.g. in a `useEffect`
 * in the editor component) and dispatch a "refresh" meta transaction when it
 * resolves, so already-visible code blocks light up as soon as the grammars
 * finish loading instead of waiting for the next edit.
 */
const StarryNightHighlight = Extension.create({
  name: "starryNightHighlight",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: starryNightHighlightPluginKey,
        state: {
          init: (_, { doc }) => getDecorations(doc),
          apply: (transaction, decorationSet, _oldState, newState) => {
            if (
              transaction.getMeta(starryNightHighlightPluginKey) === "refresh"
            ) {
              return getDecorations(newState.doc);
            }
            if (!transaction.docChanged) {
              return decorationSet.map(transaction.mapping, transaction.doc);
            }
            return getDecorations(newState.doc);
          },
        },
        props: {
          decorations(state) {
            return starryNightHighlightPluginKey.getState(state);
          },
        },
      }),
    ];
  },
});

export default StarryNightHighlight;
