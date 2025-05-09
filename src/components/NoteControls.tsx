import React, { useRef, useState, useEffect } from 'react';
import { Search, Plus, Trash2, RefreshCcw } from 'lucide-react';

interface NoteControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateNote: () => void;
  onDeleteNote: () => void;
  canDelete: boolean;
}

const NoteControls: React.FC<NoteControlsProps> = ({
  searchQuery,
  onSearchChange,
  onCreateNote,
  onDeleteNote,
  canDelete
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Setup keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      
      // Add new note with Ctrl+N or Cmd+N
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        onCreateNote();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCreateNote]);
  
  // Handle delete confirmation
  const handleDeleteClick = () => {
    if (!canDelete) return;
    
    if (showConfirmDelete) {
      onDeleteNote();
      setShowConfirmDelete(false);
    } else {
      setShowConfirmDelete(true);
    }
  };
  
  // Reset delete confirmation when clicking elsewhere
  useEffect(() => {
    if (!showConfirmDelete) return;
    
    const resetConfirmation = () => setShowConfirmDelete(false);
    document.addEventListener('click', resetConfirmation);
    
    return () => {
      document.removeEventListener('click', resetConfirmation);
    };
  }, [showConfirmDelete]);
  
  return (
    <div className="flex items-center gap-3 p-3 border-b border-zinc-800">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-zinc-400" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search notes... (Ctrl+K)"
          className="w-full py-2 pl-10 pr-3 text-sm bg-zinc-900 border border-zinc-700 rounded-md text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <button
        onClick={onCreateNote}
        className="p-2 text-zinc-300 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
        title="New note (Ctrl+N)"
      >
        <Plus className="w-4 h-4" />
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteClick();
        }}
        disabled={!canDelete}
        className={`p-2 rounded-md transition-colors ${
          showConfirmDelete 
            ? 'bg-red-900 text-red-200 hover:bg-red-800' 
            : 'text-zinc-300 bg-zinc-800 hover:bg-zinc-700'
        } ${!canDelete ? 'opacity-50 cursor-not-allowed' : ''}`}
        title="Delete note"
      >
        {showConfirmDelete ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default NoteControls;