import React, { useRef, useEffect } from 'react';
import { Note } from '../types';

interface NoteEditorProps {
  note: Note;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onUpdateNote }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-focus on title when a new note is created
  useEffect(() => {
    if (note.title === 'New Note' && !note.content) {
      titleRef.current?.focus();
      titleRef.current?.select();
    }
  }, [note.id, note.title, note.content]);
  
  // Handle auto-growing textarea
  useEffect(() => {
    const textarea = contentRef.current;
    if (!textarea) return;
    
    const adjustHeight = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };
    
    textarea.addEventListener('input', adjustHeight);
    adjustHeight(); // Initial adjustment
    
    return () => textarea.removeEventListener('input', adjustHeight);
  }, [note.id]);
  
  return (
    <div className="h-full flex flex-col p-4">
      <input
        ref={titleRef}
        type="text"
        value={note.title}
        onChange={(e) => onUpdateNote(note.id, { title: e.target.value })}
        className="w-full text-xl font-bold bg-transparent border-none text-zinc-100 focus:outline-none focus:ring-0 mb-4"
        placeholder="Title"
      />
      
      <textarea
        ref={contentRef}
        value={note.content}
        onChange={(e) => onUpdateNote(note.id, { content: e.target.value })}
        className="flex-grow w-full bg-transparent border-none text-zinc-300 focus:outline-none focus:ring-0 resize-none"
        placeholder="Start typing..."
      />
    </div>
  );
};

export default NoteEditor;