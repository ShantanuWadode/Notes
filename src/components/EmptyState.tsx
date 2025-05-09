import React from 'react';
import { FileText, PlusCircle } from 'lucide-react';

interface EmptyStateProps {
  onCreateNote: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateNote }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <FileText className="w-16 h-16 mb-4 text-zinc-700" />
      <h2 className="text-xl font-semibold text-zinc-300 mb-2">No Notes Yet</h2>
      <p className="text-zinc-500 mb-6 max-w-md">
        Create your first note to get started with this minimal, focused note-taking experience.
      </p>
      <button
        onClick={onCreateNote}
        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-zinc-200 rounded-md hover:bg-zinc-700 transition-colors"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Create Note</span>
      </button>
    </div>
  );
};

export default EmptyState;