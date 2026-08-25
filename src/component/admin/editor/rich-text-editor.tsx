"use client";

import "katex/dist/katex.min.css";
import Mathematics from "@aarkue/tiptap-math-extension";
import { BroomIcon } from "@phosphor-icons/react/dist/ssr/Broom";
import { CodeIcon } from "@phosphor-icons/react/dist/ssr/Code";
import { ListBulletsIcon } from "@phosphor-icons/react/dist/ssr/ListBullets";
import { ListNumbersIcon } from "@phosphor-icons/react/dist/ssr/ListNumbers";
import { MinusIcon } from "@phosphor-icons/react/dist/ssr/Minus";
import { QuotesIcon } from "@phosphor-icons/react/dist/ssr/Quotes";
import { TextAlignCenterIcon } from "@phosphor-icons/react/dist/ssr/TextAlignCenter";
import { TextAlignJustifyIcon } from "@phosphor-icons/react/dist/ssr/TextAlignJustify";
import { TextAlignLeftIcon } from "@phosphor-icons/react/dist/ssr/TextAlignLeft";
import { TextAlignRightIcon } from "@phosphor-icons/react/dist/ssr/TextAlignRight";
import { TextBIcon } from "@phosphor-icons/react/dist/ssr/TextB";
import { TextItalicIcon } from "@phosphor-icons/react/dist/ssr/TextItalic";
import { TextStrikethroughIcon } from "@phosphor-icons/react/dist/ssr/TextStrikethrough";
import { TextSubscriptIcon } from "@phosphor-icons/react/dist/ssr/TextSubscript";
import { TextSuperscriptIcon } from "@phosphor-icons/react/dist/ssr/TextSuperscript";
import { TextUnderlineIcon } from "@phosphor-icons/react/dist/ssr/TextUnderline";
import Color from "@tiptap/extension-color";
import HardBreak from "@tiptap/extension-hard-break";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useStarryNightHighlighter } from "@/core/hooks/use-starry-night";
import CodeBlockIndent from "@/lib/tiptap/code-block-indent";
import FontSize from "@/lib/tiptap/font-size";
import Image from "@/lib/tiptap/image";
import Indent from "@/lib/tiptap/indent";
import PasteImage from "@/lib/tiptap/paste-image";
import TextAlign from "@/lib/tiptap/text-align";
import { ColorPicker } from "./color-picker";
import { EditorButton } from "./editor-button";
import { EditorSet } from "./editor-set";
import { HyperlinkDialog } from "./hyperlink-dialog";
import StarryNightHighlight, {
  starryNightHighlightPluginKey,
} from "./starry-night-highlight";
import type { ToolbarOption } from "./types";

const HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;
const FONT_SIZES = [11, 12, 14, 16, 18, 20, 32, 40, 48, 56, 70] as const;

interface RichTextEditorProps {
  /** Initial HTML content. Only used on mount, same as the original component. */
  initialContent?: string;
  /** Called with the current HTML every time the document changes (create + update). */
  onChange: (html: string) => void;
}

export function RichTextEditor({
  initialContent = "<p>Olá, plantas! 🪴</p>",
  onChange,
}: RichTextEditorProps) {
  const [isDisplayingSourceCode, setIsDisplayingSourceCode] = useState(false);
  const [sourceDraft, setSourceDraft] = useState("");

  const editorElementRef = useRef<HTMLDivElement>(null);
  const rawHtmlTextareaRef = useRef<HTMLTextAreaElement>(null);

  const editor = useEditor({
    // required in Next.js/React 18+ to avoid SSR/client hydration
    // mismatches — TipTap otherwise renders synchronously during SSR.
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "text-container" },
    },
    extensions: [
      StarterKit.configure({ hardBreak: false }),
      HardBreak.extend({
        renderText() {
          return "\n";
        },
      }),
      Underline,
      TextStyle,
      FontSize,
      Image,
      TextAlign,
      Color,
      CodeBlockIndent,
      Indent,
      Subscript,
      Superscript,
      Mathematics,
      PasteImage,
      StarryNightHighlight,
      Link.configure({
        defaultProtocol: "https",
        protocols: ["http", "https"],
      }),
    ],
    content: initialContent,
    onCreate: ({ editor: createdEditor }) => onChange(createdEditor.getHTML()),
    onUpdate: ({ editor: updatedEditor }) => onChange(updatedEditor.getHTML()),
  });

  // loads (and caches) the Starry Night grammars once, then nudges the
  // decoration plugin to recompute as soon as they're ready — otherwise any
  // code blocks already on screen stay unhighlighted until the next edit
  // (the plugin recomputes on every doc-changing transaction, but there's no
  // transaction to piggyback on right after the grammars finish loading in
  // the background).
  const { ready: starryNightReady } = useStarryNightHighlighter();

  useEffect(() => {
    if (!editor || !starryNightReady || editor.isDestroyed) return;
    editor.view.dispatch(
      editor.view.state.tr.setMeta(starryNightHighlightPluginKey, "refresh"),
    );
  }, [editor, starryNightReady]);

  const handleToggleSourceCode = () => {
    if (!editor) return;

    if (!isDisplayingSourceCode) {
      // entering source view: snapshot the current HTML into a plain React
      // string. No entity escaping needed here — it's never turned back
      // into markup, just held as data and shown via a real <textarea>'s
      // `value` below.
      setSourceDraft(editor.getHTML());
      editor.setEditable(false);
    } else {
      // leaving source view: push whatever was typed in the textarea back
      // into the real document as a fresh parse. `setContent` is the ONLY
      // place raw HTML re-enters the schema, so this is the only place
      // extensions like the math auto-converter get a chance to run on it
      // — exactly like typing/pasting that HTML in normally would.
      // `emitUpdate: true` fires `onUpdate` (above), which already calls
      // `onChange` — no need to repeat it here.
      editor.commands.setContent(sourceDraft, { emitUpdate: true });
      editor.setEditable(true);
    }

    setIsDisplayingSourceCode((prev) => !prev);
  };

  if (!editor) return null;

  const headingAndBlockOptions: ToolbarOption[] = [
    ...HEADING_LEVELS.map((level) => ({
      active: editor.isActive("heading", { level }),
      handler: () => editor.chain().focus().toggleHeading({ level }).run(),
      title: `H${level}`,
    })),
    {
      active: editor.isActive("code"),
      handler: () => editor.chain().focus().toggleCode().run(),
      title: "Linha de código",
    },
    {
      active: editor.isActive("codeBlock"),
      handler: () => editor.chain().focus().toggleCodeBlock().run(),
      title: "Bloco de código",
    },
    {
      active: editor.isActive("paragraph"),
      handler: () => editor.chain().focus().setParagraph().run(),
      title: "Parágrafo",
    },
  ];

  const fontSizeOptions: ToolbarOption[] = [
    {
      active: false,
      handler: () => editor.chain().focus().unsetFontSize().run(),
      title: "Restaurar",
    },
    ...FONT_SIZES.map((size) => {
      const fontSize = `${size}px`;
      return {
        active: editor.isActive("textStyle", { fontSize }),
        handler: () => editor.chain().focus().setFontSize(fontSize).run(),
        title: fontSize,
      };
    }),
  ];

  return (
    <>
      <div
        id="editor-bar"
        className={clsx(
          "p-2 bg-d-gray-200 border-y border-white/5 flex flex-row flex-wrap gap-2 rounded-lg mb-4 shadow-md shadow-black/30",
          "sticky top-0 z-10",
        )}
      >
        <EditorSet title="Formatar" options={headingAndBlockOptions} />

        <div className="flex flex-row items-center gap-1">
          <EditorButton
            title="Negrito"
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <TextBIcon weight="bold" size={20} />
          </EditorButton>

          <EditorButton
            title="Itálico"
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <TextItalicIcon weight="bold" size={20} />
          </EditorButton>

          <EditorButton
            title="Underline"
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <TextUnderlineIcon weight="bold" size={20} />
          </EditorButton>

          <EditorButton
            title="Riscar"
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <TextStrikethroughIcon weight="bold" size={20} />
          </EditorButton>

          <ColorPicker editor={editor} />
        </div>

        <EditorSet title="Tamanho" options={fontSizeOptions} />

        <div className="flex flex-row items-center gap-1">
          <EditorButton
            title="Alinhar à esquerda"
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().toggleTextAlign("left").run()}
          >
            <TextAlignLeftIcon weight="bold" size={20} />
          </EditorButton>

          <EditorButton
            title="Alinhar ao centro"
            active={editor.isActive({ textAlign: "center" })}
            onClick={() =>
              editor.chain().focus().toggleTextAlign("center").run()
            }
          >
            <TextAlignCenterIcon weight="bold" size={20} />
          </EditorButton>

          <EditorButton
            title="Alinhar à direita"
            active={editor.isActive({ textAlign: "right" })}
            onClick={() =>
              editor.chain().focus().toggleTextAlign("right").run()
            }
          >
            <TextAlignRightIcon weight="bold" size={20} />
          </EditorButton>

          <EditorButton
            title="Justificar"
            active={editor.isActive({ textAlign: "justify" })}
            onClick={() =>
              editor.chain().focus().toggleTextAlign("justify").run()
            }
          >
            <TextAlignJustifyIcon weight="bold" size={20} />
          </EditorButton>
        </div>

        <div className="flex flex-row items-center gap-1">
          <EditorButton
            title="Linha Horizontal"
            active={editor.isActive("horizontalRule")}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <MinusIcon weight="bold" size={20} />
          </EditorButton>

          <EditorButton
            title="Quote"
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <QuotesIcon weight="bold" size={20} />
          </EditorButton>

          <EditorButton
            title="Super-escrita"
            active={editor.isActive("superscript")}
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
          >
            <TextSuperscriptIcon weight="bold" size={20} />
          </EditorButton>

          <EditorButton
            title="Sub-escrita"
            active={editor.isActive("subscript")}
            onClick={() => editor.chain().focus().toggleSubscript().run()}
          >
            <TextSubscriptIcon weight="bold" size={20} />
          </EditorButton>

          <EditorButton
            active={editor.isActive("bulletList")}
            title="Lista"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <ListBulletsIcon weight="bold" size={20} />
          </EditorButton>

          <EditorButton
            active={editor.isActive("orderedList")}
            title="Lista Enumerada"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListNumbersIcon weight="bold" size={20} />
          </EditorButton>

          <HyperlinkDialog editor={editor} />
        </div>

        <div className="flex flex-row items-center gap-1">
          <EditorButton
            active={isDisplayingSourceCode}
            title="Código Fonte"
            onClick={handleToggleSourceCode}
          >
            <CodeIcon weight="bold" size={20} />
          </EditorButton>

          <EditorButton
            active={false}
            title="Limpar Formatação"
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
          >
            <BroomIcon weight="bold" size={20} />
          </EditorButton>
        </div>
      </div>

      {/** biome-ignore lint/a11y/noStaticElementInteractions: this works */}
      {/** biome-ignore lint/a11y/useKeyWithClickEvents: this too */}
      <div
        onClick={(e) => {
          if (e.target !== e.currentTarget) return;
          if (isDisplayingSourceCode) {
            rawHtmlTextareaRef.current?.focus();
            return;
          }
          editor?.commands.focus(); // Jeito correto de focar o TipTap
        }}
        className={clsx(
          "dark p-6 rounded-xl bg-d-backgrond/25 shadow-d-gray-300 shadow-[inset_0_0_0_1px_var(--tw-shadow)]",
          "overscroll-y-auto overflow-x-hidden resize-y",
          "**:focus-within:outline-none",
        )}
      >
        {isDisplayingSourceCode ? (
          // Plain, uncontrolled-by-tiptap textarea: React sets `.value`
          // directly, no HTML parsing involved, so nothing here can ever be
          // misread as an entity, a tag, or `$...$` math.
          <textarea
            value={sourceDraft}
            onChange={(event) => setSourceDraft(event.target.value)}
            spellCheck={false}
            className="w-full min-h-60 bg-transparent font-mono text-sm text-white/90 outline-none resize-none"
            ref={rawHtmlTextareaRef}
          />
        ) : (
          <EditorContent ref={editorElementRef} editor={editor} />
        )}
      </div>
    </>
  );
}
