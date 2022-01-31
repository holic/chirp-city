import Document from "@tiptap/extension-document";
import Mention from "@tiptap/extension-mention";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";

export const Editor = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Mention],
    // content: "Hello world",
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  return (
    <div
      className="flex flex-auto cursor-text"
      onClick={() => editor?.commands.focus()}
    >
      <EditorContent editor={editor} />
    </div>
  );
};
