import { Extension } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";

const CodeBlockIndent = Extension.create({
  name: "codeBlockIndent",
  addKeyboardShortcuts() {
    return {
      Tab: ({ editor }) => {
        return editor
          .chain()
          .command(({ tr }) => {
            const { doc, selection } = tr;
            if (!doc || !selection || !(selection instanceof TextSelection))
              return false;
            const { from, to } = selection;
            let tabbed = false;
            doc.nodesBetween(from, to, (node, _pos) => {
              if (node.type.name === "codeBlock") {
                tr.insertText("\t");
                tabbed = true;
              }
            });
            return tabbed;
          })
          .run(); // <- make sure to return true to prevent the tab from blurring.
      },
      "Shift-Tab": ({ editor }) => {
        return editor
          .chain()
          .command(({ tr }) => {
            const { doc, selection } = tr;
            if (!doc || !selection || !(selection instanceof TextSelection))
              return false;
            const { from, to } = selection;
            let tabbed = false;
            doc.nodesBetween(from, to, (node, _pos) => {
              if (node.type.name === "codeBlock") {
                tr.insertText("  ");
                tabbed = true;
              }
            });
            return tabbed;
          })
          .run(); // <- make sure to return true to prevent the tab from blurring.
      },
    };
  },
});

export default CodeBlockIndent;
