import { useState, useRef, useEffect, forwardRef } from 'react';
import { useFormContext } from '../../context/FormContext';

const Autocomplete = forwardRef(({
  label,
  suggestions: externalSuggestions,
  onSelect,
  onBlur,
  error,
  helperText,
  required = false,
  className = '',
  value = '',
  onChange,
  autoSaveType, // 'name', 'address', 'phone', 'city', 'county', or null
  ...props
}, ref) => {
  const { formData, addAutocompleteSuggestion } = useFormContext();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [allSuggestions, setAllSuggestions] = useState([]);
  const wrapperRef = useRef(null);

  // Auto-detect field type from label if not specified
  const detectFieldType = () => {
    if (autoSaveType) return autoSaveType;
    if (!label) return null;

    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('name') && !lowerLabel.includes('trust') && !lowerLabel.includes('company')) {
      return 'name';
    }
    if (lowerLabel.includes('address') || lowerLabel.includes('street')) {
      return 'address';
    }
    if (lowerLabel.includes('phone') || lowerLabel.includes('telephone')) {
      return 'phone';
    }
    if (lowerLabel.includes('city')) {
      return 'city';
    }
    if (lowerLabel.includes('county')) {
      return 'county';
    }
    if (lowerLabel.includes('zip')) {
      return 'zip';
    }
    return null;
  };

  const fieldType = detectFieldType();

  // Load suggestions based on field type from formData
  useEffect(() => {
    let loadedSuggestions = [];

    if (externalSuggestions) {
      // Use externally provided suggestions if available
      loadedSuggestions = externalSuggestions;
    } else if (fieldType && formData.autocompleteSuggestions) {
      // Auto-load suggestions from formData based on field type
      const typeKey = fieldType + 's'; // 'name' -> 'names', 'address' -> 'addresses'
      loadedSuggestions = formData.autocompleteSuggestions[typeKey] || [];
    }

    setAllSuggestions(loadedSuggestions);
  }, [externalSuggestions, fieldType, formData.autocompleteSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update filtered suggestions when value or allSuggestions changes
  useEffect(() => {
    if (value) {
      // If there's a value, filter based on it
      const filtered = allSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      // If no value, show all suggestions
      setFilteredSuggestions(allSuggestions);
    }
  }, [allSuggestions, value]);

  const handleChange = (e) => {
    const userInput = e.target.value;

    // Filter suggestions based on input
    const filtered = allSuggestions.filter((suggestion) =>
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

  // Auto-save value to autocomplete when user finishes typing
  const handleAutoSave = (value) => {
    if (!value || !fieldType || value.trim().length === 0) return;

    const trimmedValue = value.trim();

    // Only save if it's a meaningful value (more than 2 characters for names/addresses)
    if (fieldType === 'name' || fieldType === 'address') {
      if (trimmedValue.length < 3) return;
    }

    // Add to formData suggestions
    addAutocompleteSuggestion(fieldType, trimmedValue);
  };

  const handleKeyDown = (e) => {
    // Only handle specific keys, let all other keys (including space) work normally
    if (e.key === 'Enter') {
      e.preventDefault();
      if (showSuggestions && filteredSuggestions.length > 0) {
        handleClick(filteredSuggestions[activeSuggestionIndex]);
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault(); // Prevent cursor movement
      if (activeSuggestionIndex === 0) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault(); // Prevent cursor movement
      if (activeSuggestionIndex === filteredSuggestions.length - 1) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
      return;
    }

    if (e.key === 'Escape') {
      setShowSuggestions(false);
      return;
    }

    // Let all other keys (including space) work normally
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
        onBlur={(e) => {
          setShowSuggestions(false);
          // Auto-save the value when user leaves the field
          handleAutoSave(e.target.value);
          if (onBlur) {
            onBlur(e);
          }
        }}
        onFocus={() => {
          if (allSuggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
        autoComplete="off"
        className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent input blur
                handleClick(suggestion);
              }}
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
