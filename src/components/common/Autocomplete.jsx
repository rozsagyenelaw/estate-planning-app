import { useState, useRef, useEffect, forwardRef } from 'react';

const Autocomplete = forwardRef(({
  label,
  suggestions = [],
  onSelect,
  onBlur,
  error,
  helperText,
  required = false,
  className = '',
  value = '',
  onChange,
  ...props
}, ref) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update filtered suggestions when suggestions prop changes
  useEffect(() => {
    console.log('🔍 Autocomplete useEffect triggered', {
      label,
      suggestionsCount: suggestions.length,
      suggestions,
      value,
      hasValue: !!value
    });

    if (value) {
      // If there's a value, filter based on it
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      console.log('  → Filtered suggestions (with value):', filtered);
      setFilteredSuggestions(filtered);
    } else {
      // If no value, show all suggestions
      console.log('  → Setting all suggestions (no value):', suggestions);
      setFilteredSuggestions(suggestions);
    }
  }, [suggestions, value, label]);

  const handleChange = (e) => {
    const userInput = e.target.value;

    // Filter suggestions based on input
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(userInput.toLowerCase())
    );

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    setActiveSuggestionIndex(0);

    if (onChange) {
      onChange(e);
    }
  };

  const handleClick = (suggestion) => {
    setShowSuggestions(false);
    if (onSelect) {
      onSelect(suggestion);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (showSuggestions && filteredSuggestions.length > 0) {
        handleClick(filteredSuggestions[activeSuggestionIndex]);
      }
    } else if (e.key === 'ArrowUp') {
      if (activeSuggestionIndex === 0) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    } else if (e.key === 'ArrowDown') {
      if (activeSuggestionIndex === filteredSuggestions.length - 1) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="mb-4 relative" ref={wrapperRef}>
      {label && (
        <label className="label-text">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={(e) => {
          console.log('👋 Blur event on', label, '- value:', e.target.value);
          setShowSuggestions(false);
          if (onBlur) {
            console.log('  → Calling onBlur handler with value:', e.target.value);
            onBlur(e);
          }
        }}
        onFocus={() => {
          console.log('👁️ Focus event on', label, '- suggestions:', suggestions.length, 'filteredSuggestions:', filteredSuggestions.length);
          if (suggestions.length > 0) {
            console.log('  → Showing suggestions');
            setShowSuggestions(true);
          } else {
            console.log('  → No suggestions to show');
          }
        }}
        className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleClick(suggestion)}
              className={`px-4 py-2 cursor-pointer hover:bg-primary-50 ${
                index === activeSuggestionIndex ? 'bg-primary-100' : ''
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete;
