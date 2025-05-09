import { useState, useEffect, useCallback } from 'react';
import { Note } from '../types';
import { loadNotes, saveNotes } from '../utils/storage';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = loadNotes();
    setNotes(savedNotes);
    
    // Select the most recently updated note, if any exist
    if (savedNotes.length > 0) {
      const mostRecent = [...savedNotes].sort((a, b) => b.updatedAt - a.updatedAt)[0];
      setSelectedNoteId(mostRecent.id);
    }
  }, []);
  
  // Save notes to localStorage whenever they change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);
  
  // Create a new note
  const createNote = useCallback(() => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    setNotes(prev => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
    return newNote;
  }, []);
  
  // Update a note
  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: Date.now() } 
        : note
    ));
  }, []);
  
  // Delete a note
  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    
    // If the deleted note was selected, select another note
    if (selectedNoteId === id) {
      setSelectedNoteId(prev => {
        const remainingNotes = notes.filter(note => note.id !== id);
        return remainingNotes.length > 0 ? remainingNotes[0].id : null;
      });
    }
  }, [notes, selectedNoteId]);
  
  // Get the currently selected note
  const selectedNote = notes.find(note => note.id === selectedNoteId) || null;
  
  // Filter notes based on search query
  const filteredNotes = searchQuery 
    ? notes.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : notes;
  
  return {
    notes: filteredNotes,
    selectedNote,
    searchQuery,
    setSearchQuery,
    selectedNoteId,
    setSelectedNoteId,
    createNote,
    updateNote,
    deleteNote
  };
};