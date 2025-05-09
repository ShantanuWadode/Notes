export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  
  // If today, show time only
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // Show date and time for older notes
  return date.toLocaleDateString([], { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};