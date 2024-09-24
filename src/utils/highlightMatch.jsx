import React from "react";

// Helper function to highlight matching characters
const highlightMatch = (text, searchTerm) => {
  const lowerText = text.toLowerCase();
  const lowerSearchTerm = searchTerm.toLowerCase();
  const searchTermLength = searchTerm.length;

  let result = [];
  let i = 0;

  while (i < text.length) {
    if (lowerText.substr(i, searchTermLength) === lowerSearchTerm) {
      result.push(<strong key={i}>{text.substr(i, searchTermLength)}</strong>);
      i += searchTermLength;
    } else {
      result.push(<span key={i}>{text[i]}</span>);
      i++;
    }
  }

  return result;
};

export default highlightMatch;
