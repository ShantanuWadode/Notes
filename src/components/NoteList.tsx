import React from 'react';
import { Note } from '../types';
import { formatDate } from '../utils/dateUtils';

interface NoteListProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, selectedNoteId, onSelectNote }) => {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <p className="text-zinc-500">No notes found</p>
        <p className="mt-2 text-sm text-zinc-600">Create a new note to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full">
      {notes.map(note => (
        <div
          key={note.id}
          onClick={() => onSelectNote(note.id)}
          className={`
            p-4 border-b border-zinc-800 cursor-pointer transition-all
            ${selectedNoteId === note.id ? 'bg-zinc-800' : 'bg-black hover:bg-zinc-900'}
          `}
        >
          <h3 className="font-medium text-zinc-200 truncate">
            {note.title || 'Untitled Note'}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-zinc-500 line-clamp-1">
              {note.content || 'No content'}
            </p>
            <span className="text-xs text-zinc-600 whitespace-nowrap ml-2">
              {formatDate(note.updatedAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;