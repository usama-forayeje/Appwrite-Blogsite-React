import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, Strikethrough, Code } from 'lucide-react';

const TiptapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write your masterpiece here...',
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px]',
      },
    },
  });

  return (
    <div className="border rounded-md p-4">
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="bg-background border rounded-md shadow-lg p-1 flex gap-1">
          <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}><Bold className="h-4 w-4" /></button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}><Italic className="h-4 w-4" /></button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}><Strikethrough className="h-4 w-4" /></button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;