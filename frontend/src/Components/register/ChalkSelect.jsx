import { motion } from 'motion/react';

const ROLES = [
  { value: 'student', label: 'Student', desc: 'I am a learner' },
  { value: 'teacher', label: 'Teacher', desc: 'I teach classes' },
];

export default function ChalkSelect({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
      {ROLES.map((role) => {
        const selected = value === role.value;
        return (
          <motion.button
            key={role.value}
            type="button"
            onClick={() => onChange(role.value)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "'Fredericka the Great', cursive",
              background: selected ? 'rgba(242,237,216,0.15)' : 'transparent',
              border: selected
                ? '2px solid rgba(242,237,216,0.8)'
                : '2px solid rgba(242,237,216,0.3)',
              color: selected ? '#F2EDD8' : 'rgba(242,237,216,0.55)',
              padding: '10px 20px',
              cursor: 'pointer',
              minWidth: '110px',
              textAlign: 'center',
              position: 'relative',
              outline: 'none',
              transition: 'all 0.2s ease',
              boxShadow: selected
                ? 'inset 0 0 16px rgba(242,237,216,0.08), 0 0 10px rgba(242,237,216,0.06)'
                : 'none',
            }}
          >
            {selected && (
              <motion.div
                layoutId="role-selection"
                style={{
                  position: 'absolute',
                  inset: -2,
                  border: '2px solid rgba(242,237,216,0.8)',
                  pointerEvents: 'none',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)' }}>{role.label}</div>
            <div style={{ fontSize: '0.65rem', marginTop: '3px', letterSpacing: '0.08em', opacity: 0.7 }}>
              {role.desc}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
