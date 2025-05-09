import React, { useEffect } from 'react';
import { useNotes } from '../hooks/useNotes';
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';
import NoteControls from './NoteControls';
import EmptyState from './EmptyState';

const NoteApp: React.FC = () => {
  const {
    notes,
    selectedNote,
    searchQuery,
    setSearchQuery,
    selectedNoteId,
    setSelectedNoteId,
    createNote,
    updateNote,
    deleteNote
  } = useNotes();
  
  // Set document title based on selected note
  useEffect(() => {
    if (selectedNote) {
      document.title = selectedNote.title || 'Untitled Note';
    } else {
      document.title = 'Notes';
    }
  }, [selectedNote]);
  
  return (
    <div className="flex flex-col md:flex-row h-screen bg-black text-zinc-200">
      {/* Sidebar with note list */}
      <div className="flex flex-col w-full md:w-80 border-r border-zinc-800">
        <div className="p-4 border-b border-zinc-800">
          <h1 className="text-xl font-bold">Notes</h1>
        </div>
        
        <NoteControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCreateNote={createNote}
          onDeleteNote={() => selectedNoteId && deleteNote(selectedNoteId)}
          canDelete={!!selectedNoteId}
        />
        
        <div className="flex-grow overflow-hidden">
          <NoteList
            notes={notes}
            selectedNoteId={selectedNoteId}
            onSelectNote={setSelectedNoteId}
          />
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-grow overflow-hidden">
        {selectedNote ? (
          <NoteEditor
            note={selectedNote}
            onUpdateNote={updateNote}
          />
        ) : (
          <EmptyState onCreateNote={createNote} />
        )}
      </div>
    </div>
  );
};

export default NoteApp;