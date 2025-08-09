"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import "./tiptap.css";

interface RichTextEditorProps {
  onContentChange: (content: string) => void;
}

const RichTextEditor = ({ onContentChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <MenuBar editor={editor} />
      <div className="container_editor">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
