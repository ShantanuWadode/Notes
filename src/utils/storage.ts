import { Note } from '../types';

const STORAGE_KEY = 'notes-app-data';

export const saveNotes = (notes: Note[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

export const loadNotes = (): Note[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  
  try {
    return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to parse saved notes', e);
    return [];
  }
};