import { memo } from 'react';
import { motion } from 'motion/react';

const ArrowBtn = memo(function ArrowBtn({ onClick, disabled, label, children }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.15 } : {}}
      whileTap={!disabled ? { scale: 0.92 } : {}}
      title={label}
      style={{
        background: 'transparent',
        border: '2px solid',
        borderColor: disabled ? 'rgba(242,237,216,0.15)' : 'rgba(242,237,216,0.5)',
        borderRadius: '50%',
        width: '42px',
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: disabled ? 'rgba(242,237,216,0.2)' : 'rgba(242,237,216,0.85)',
        fontFamily: "'Fredericka the Great', cursive",
        fontSize: '1.2rem',
        outline: 'none',
        transition: 'border-color 0.2s, color 0.2s',
        boxShadow: disabled ? 'none' : '0 0 6px rgba(242,237,216,0.06)',
      }}
    >
      {children}
    </motion.button>
  );
});

const NavigationArrows = memo(function NavigationArrows({ onPrev, onNext, canPrev, canNext, isLast }) {
  return (
    <div style={{
      position: 'absolute', bottom: '7%', right: '7%',
      display: 'flex', gap: '10px', alignItems: 'center', zIndex: 20,
    }}>
      <ArrowBtn onClick={onPrev} disabled={!canPrev} label="Previous">←</ArrowBtn>
      <ArrowBtn onClick={onNext} disabled={!canNext} label={isLast ? 'Finish' : 'Next'}>
        {isLast ? '✓' : '→'}
      </ArrowBtn>
    </div>
  );
});

export default NavigationArrows;
