import _Image from "@tiptap/extension-image";

const Image = _Image.extend({
  addAttributes() {
    return {
      width: {
        default: null,
        renderHTML: (attributes) => {
          return {
            style: `width: ${attributes.width}px`,
          };
        },
      },
      src: {
        default: null,
        renderHTML: (attributes) => {
          return { src: attributes.src };
        },
      },
    };
  },
});

export default Image;
