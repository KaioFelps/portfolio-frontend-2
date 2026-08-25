import type { Editor } from "@tiptap/core";
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

async function pasteClipboardImageAsNode(): Promise<string | undefined> {
  try {
    const cbContents = await navigator.clipboard.read();
    const lastCbTypes = cbContents[0].types;
    if (
      !(lastCbTypes[0] === "text/html" && lastCbTypes[1]?.startsWith("image/"))
    )
      return;
    const blob = await cbContents[0].getType("text/html");
    const imgNode = await blob.text();
    return imgNode;
  } catch {
    return undefined;
  }
}

export async function handlePasteImageWithOrigin(editor?: Editor | null) {
  if (!editor) return;
  const imgElement = await pasteClipboardImageAsNode();
  if (!imgElement) return;
  const template = document.createElement("div");
  template.innerHTML = imgElement;
  const src = template.querySelector("img")?.src;
  if (!src) return;
  editor.chain().focus().setImage({ src }).run();
}

/**
 * Wires `handlePasteImageWithOrigin` into the editor's paste event.
 *
 * In the original Svelte version this was passed as `onPaste` directly to
 * `new Editor({ ... })`, closing over the `editor` variable assigned right
 * after construction. In React that variable doesn't exist yet while the
 * `useEditor` config object is being built.
 *
 * `onPaste`/`onDrop` *do* exist as top-level `Editor`/`useEditor` options
 * (`(event, slice) => void`), but there's no equivalent `onPaste` lifecycle
 * hook on `ExtensionConfig` — extensions only get paste/drop access through
 * a ProseMirror plugin's `handlePaste` prop, which is what this does. Inside
 * `addProseMirrorPlugins()`, `this.editor` is already the live editor
 * instance (same as `this.editor` in `indent.ts`'s `onUpdate()`), so there's
 * no ref/closure juggling needed.
 */
const PasteImage = Extension.create({
  name: "pasteImage",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("pasteImage"),
        props: {
          handlePaste: () => {
            void handlePasteImageWithOrigin(this.editor);
            // Returning false keeps the default paste behavior running
            // too (e.g. pasting plain text), same as the original,
            // which never called `event.preventDefault()` either.
            return false;
          },
        },
      }),
    ];
  },
});

export default PasteImage;
