import { motion, AnimatePresence } from 'motion/react';

const FONT = "'Fredericka the Great', cursive";
const CHALK = '#F2EDD8';
const CHALK_DIM = 'rgba(242,237,216,0.45)';
const CHALK_FAINT = 'rgba(242,237,216,0.22)';

const variants = {
  enter: { x: '55%', opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit: { x: '-45%', opacity: 0, transition: { duration: 0.28, ease: 'easeIn' } },
};

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: FONT, color: CHALK_FAINT, fontSize: 'clamp(0.6rem,1.1vw,0.78rem)', letterSpacing: '0.1em', minWidth: '100px', flexShrink: 0 }}>
        {label}:
      </span>
      <span style={{ fontFamily: FONT, color: CHALK, fontSize: 'clamp(0.75rem,1.4vw,0.95rem)', wordBreak: 'break-word' }}>
        {value}
      </span>
    </div>
  );
}

export default function ReviewStep({ data, direction, onSubmit, isLoading, error, success }) {
  const roleLabel = { student: 'Student', teacher: 'Teacher' }[data.role] || data.role;

  const sections = Array.isArray(data.assignedSections) && data.assignedSections.length > 0
    ? data.assignedSections.map((s) => `${s.className || '—'} / ${s.sectionName || '—'}`).join(', ')
    : null;

  const qualifications = Array.isArray(data.qualifications) && data.qualifications.length > 0
    ? data.qualifications.join(', ')
    : null;

  return (
    <motion.div
      key="review"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      style={{
        position: 'absolute', inset: 0,
        padding: 'clamp(16px,4%,40px) clamp(24px,8%,80px)',
        paddingBottom: 'clamp(56px,10%,80px)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontFamily: FONT, color: CHALK_FAINT, fontSize: 'clamp(0.6rem,1vw,0.75rem)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '6px' }}>
          Review
        </p>
        <h2 style={{ fontFamily: FONT, color: CHALK, fontSize: 'clamp(1.1rem,2.6vw,1.7rem)', fontWeight: 400, textShadow: '0 0 10px rgba(255,255,255,0.08)', margin: 0 }}>
          Welcome To EduFlow ERP
        </h2>
      </div>

      <div style={{ height: '1px', background: 'rgba(242,237,216,0.12)', marginBottom: '14px' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px', flex: 1, overflowY: 'auto' }} className="chalk-scroll">
        <Row label="Full Name"        value={data.fullName} />
        <Row label="Email"            value={data.email} />
        <Row label="Role"             value={roleLabel} />
        <Row label="School ID"        value={data.schoolId} />
        <Row label="Class"            value={data.className} />
        <Row label="Section"          value={data.sectionName} />
        <Row label="Photo"            value={data.userImage ? '✓ Uploaded' : null} />
        <Row label="Roll No."         value={data.rollNumber} />
        <Row label="Date of Birth"    value={data.dateOfBirth} />
        <Row label="Subject"          value={data.subject} />
        <Row label="Experience"       value={data.experience} />
        <Row label="Qualifications"   value={qualifications} />
        <Row label="Sections"         value={sections} />
      </div>

      <div style={{ height: '1px', background: 'rgba(242,237,216,0.12)', marginTop: '14px', marginBottom: '12px' }} />

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: FONT, color: 'rgba(180,255,160,0.85)',
              fontSize: 'clamp(0.85rem,1.8vw,1.1rem)',
              textShadow: '0 0 10px rgba(100,255,100,0.2)', letterSpacing: '0.08em',
            }}
          >
            ✓ Registration successful! Redirecting…
          </motion.div>
        ) : (
          <motion.div key="actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontFamily: FONT, color: 'rgba(255,140,140,0.9)',
                  fontSize: 'clamp(0.7rem,1.3vw,0.88rem)', letterSpacing: '0.06em', margin: 0,
                }}
              >
                ⚠ {error}
              </motion.p>
            )}
            <motion.button
              type="button"
              onClick={() => !isLoading && onSubmit?.()}
              whileHover={!isLoading ? { scale: 1.03, boxShadow: '0 0 18px rgba(242,237,216,0.12)' } : {}}
              whileTap={!isLoading ? { scale: 0.97 } : {}}
              disabled={isLoading}
              style={{
                fontFamily: FONT,
                background: isLoading ? 'rgba(242,237,216,0.05)' : 'rgba(242,237,216,0.1)',
                border: `2px solid ${isLoading ? 'rgba(242,237,216,0.2)' : CHALK_DIM}`,
                color: isLoading ? 'rgba(242,237,216,0.4)' : CHALK,
                padding: 'clamp(8px,1.5vw,12px) clamp(20px,4vw,40px)',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: 'clamp(0.75rem,1.6vw,1rem)',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                textShadow: '0 0 8px rgba(255,255,255,0.06)',
                transition: 'border-color 0.2s, color 0.2s, background 0.2s',
              }}
            >
              {isLoading ? 'Registering…' : 'Complete Registration'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
