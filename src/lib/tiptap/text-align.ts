import type { CommandProps } from "@tiptap/core";
import _TextAlign from "@tiptap/extension-text-align";

const alignments = ["left", "center", "right", "justify"] as const;
type TextAlignments = (typeof alignments)[number];

export type FontSizeOptions = {
  types: string[];
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    TextAlign: {
      /**
       * Toggles the paragraph text align.
       *
       * If current align is already set, it will be removed. Otherwise, it will
       * override the last align set.
       */
      toggleTextAlign: (align: TextAlignments) => ReturnType;
    };
  }
}

/**
 * An extension of TextAlign extension that includes `toggleTextAlign` method.
 */
const TextAlign = _TextAlign
  .configure({
    types: ["heading", "paragraph"],
    alignments: alignments.slice(0),
  })
  .extend({
    addCommands() {
      return {
        ...(this.parent ? this.parent() : {}),
        toggleTextAlign(align) {
          return ({ editor, chain }: CommandProps) => {
            if (editor.isActive({ textAlign: align }))
              return chain().unsetTextAlign().run();
            return chain().setTextAlign(align).run();
          };
        },
      };
    },
  });

export default TextAlign;
