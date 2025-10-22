import { forwardRef } from 'react';

const Radio = forwardRef(({
  label,
  options = [],
  error,
  helperText,
  required = false,
  name,
  value,
  onChange,
  className = '',
}, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="label-text">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className={`space-y-2 ${className}`}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              ref={ref}
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-2 block text-sm text-gray-900"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Radio.displayName = 'Radio';

export default Radio;
