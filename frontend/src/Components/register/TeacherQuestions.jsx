import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ChalkInput from './ChalkInput';

const CHALK = '#F2EDD8';
const CHALK_DIM = 'rgba(242,237,216,0.35)';
const FONT = "'Fredericka the Great', cursive";

/* ─── Qualification chips ─── */
function ChipsInput({ chips, setChips }) {
  const [input, setInput] = useState('');

  const add = () => {
    const val = input.trim();
    if (val && !chips.includes(val)) {
      setChips((prev) => [...prev, val]);
    }
    setInput('');
  };

  const remove = (chip) => setChips((prev) => prev.filter((c) => c !== chip));

  return (
    <div style={{ width: '100%', maxWidth: '520px' }}>
      {/* Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '28px', marginBottom: '10px' }}>
        <AnimatePresence>
          {chips.map((chip) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              style={{
                fontFamily: FONT,
                color: CHALK,
                border: `1.5px solid ${CHALK_DIM}`,
                padding: '2px 10px',
                fontSize: '0.8rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(242,237,216,0.06)',
              }}
            >
              {chip}
              <button
                type="button"
                onClick={() => remove(chip)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(242,237,216,0.5)',
                  cursor: 'pointer',
                  fontFamily: FONT,
                  fontSize: '0.7rem',
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Input + add */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
        <input
          className="chalk-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder="e.g. B.Ed, M.Ed, MSc Physics…"
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: `2px solid ${CHALK_DIM}`,
            outline: 'none',
            color: CHALK,
            fontFamily: FONT,
            fontSize: 'clamp(0.9rem, 1.8vw, 1.3rem)',
            padding: '4px 2px 10px',
            caretColor: CHALK,
            flex: 1,
          }}
          onFocus={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(242,237,216,0.8)'; }}
          onBlur={(e) => { e.currentTarget.style.borderBottomColor = CHALK_DIM; }}
        />
        <button
          type="button"
          onClick={add}
          style={{
            fontFamily: FONT,
            background: 'transparent',
            border: `1.5px solid ${CHALK_DIM}`,
            color: CHALK,
            padding: '4px 12px',
            cursor: 'pointer',
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
            whiteSpace: 'nowrap',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(242,237,216,0.8)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = CHALK_DIM; }}
        >
          + Add
        </button>
      </div>
      <p style={{ fontFamily: FONT, fontSize: '0.68rem', color: 'rgba(242,237,216,0.3)', marginTop: '6px' }}>
        Press Enter or click Add after each qualification
      </p>
    </div>
  );
}

/* ─── Assigned sections ─── */
function SectionsInput({ sections, setSections }) {
  const addRow = () => setSections((prev) => [...prev, { className: '', sectionName: '' }]);

  const updateRow = (idx, field, val) => {
    setSections((prev) => prev.map((row, i) => i === idx ? { ...row, [field]: val } : row));
  };

  const removeRow = (idx) => {
    if (sections.length > 1) setSections((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div style={{ width: '100%', maxWidth: '520px' }}>
      <div
        className="chalk-scroll"
        style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '160px', overflowY: 'auto' }}
      >
        <AnimatePresence>
          {sections.map((row, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}
            >
              <input
                className="chalk-input"
                value={row.className}
                onChange={(e) => updateRow(idx, 'className', e.target.value)}
                placeholder="Class name"
                style={{
                  background: 'transparent', border: 'none',
                  borderBottom: `2px solid ${CHALK_DIM}`, outline: 'none',
                  color: CHALK, fontFamily: FONT,
                  fontSize: 'clamp(0.8rem, 1.6vw, 1.1rem)',
                  padding: '3px 2px 8px', caretColor: CHALK, flex: 1,
                }}
                onFocus={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(242,237,216,0.75)'; }}
                onBlur={(e) => { e.currentTarget.style.borderBottomColor = CHALK_DIM; }}
              />
              <input
                className="chalk-input"
                value={row.sectionName}
                onChange={(e) => updateRow(idx, 'sectionName', e.target.value)}
                placeholder="Section"
                style={{
                  background: 'transparent', border: 'none',
                  borderBottom: `2px solid ${CHALK_DIM}`, outline: 'none',
                  color: CHALK, fontFamily: FONT,
                  fontSize: 'clamp(0.8rem, 1.6vw, 1.1rem)',
                  padding: '3px 2px 8px', caretColor: CHALK, width: '90px',
                }}
                onFocus={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(242,237,216,0.75)'; }}
                onBlur={(e) => { e.currentTarget.style.borderBottomColor = CHALK_DIM; }}
              />
              {sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(idx)}
                  style={{
                    background: 'none', border: 'none',
                    color: 'rgba(242,237,216,0.35)', cursor: 'pointer',
                    fontFamily: FONT, fontSize: '1rem', paddingBottom: '8px',
                  }}
                >
                  ×
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={addRow}
        style={{
          marginTop: '10px',
          fontFamily: FONT, background: 'transparent',
          border: `1.5px solid ${CHALK_DIM}`, color: CHALK,
          padding: '4px 14px', cursor: 'pointer', fontSize: '0.75rem',
          letterSpacing: '0.06em', transition: 'border-color 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(242,237,216,0.8)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = CHALK_DIM; }}
      >
        + Add More
      </button>
    </div>
  );
}

/* ─── Main export ─── */
export default function TeacherQuestions({ stepId, register, errors, chips, setChips, sections, setSections }) {
  if (stepId === 'subject') {
    return (
      <ChalkInput
        placeholder="e.g. Mathematics"
        error={errors.subject}
        {...register('subject', { required: 'Subject is required' })}
      />
    );
  }

  if (stepId === 'qualification') {
    return <ChipsInput chips={chips} setChips={setChips} />;
  }

  if (stepId === 'experience') {
    return (
      <ChalkInput
        placeholder="e.g. 5 years"
        error={errors.experience}
        {...register('experience')}
      />
    );
  }

  if (stepId === 'assignedSections') {
    return <SectionsInput sections={sections} setSections={setSections} />;
  }

  return null;
}
