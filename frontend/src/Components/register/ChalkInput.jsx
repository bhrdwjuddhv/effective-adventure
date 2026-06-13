import { forwardRef } from 'react';

const BASE = {
  background: 'transparent',
  border: 'none',
  borderBottom: '2px solid rgba(242,237,216,0.32)',
  outline: 'none',
  color: '#F2EDD8',
  fontFamily: "'Fredericka the Great', cursive",
  width: '100%',
  padding: '4px 2px 10px',
  caretColor: '#F2EDD8',
  textShadow: '0 0 6px rgba(255,255,255,0.06)',
  transition: 'border-color 0.25s ease',
  letterSpacing: '0.02em',
};

const ChalkInput = forwardRef(function ChalkInput(
  { type = 'text', placeholder, error, onFocus, onBlur, style, ...rest },
  ref
) {
  return (
    <div style={{ width: '100%', maxWidth: '520px' }}>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className="chalk-input"
        autoComplete="off"
        spellCheck={false}
        onFocus={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(242,237,216,0.8)'; onFocus?.(e); }}
        onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(242,237,216,0.32)'; onBlur?.(e); }}
        style={{ ...BASE, fontSize: 'clamp(0.95rem, 2vw, 1.45rem)', ...style }}
        {...rest}
      />
      {error && (
        <p style={{
          fontFamily: "'Fredericka the Great', cursive",
          color: 'rgba(255,165,100,0.9)',
          fontSize: '0.78rem',
          marginTop: '5px',
          textShadow: '0 0 4px rgba(255,100,0,0.2)',
        }}>
          ✕ {error.message}
        </p>
      )}
    </div>
  );
});

export default ChalkInput;
