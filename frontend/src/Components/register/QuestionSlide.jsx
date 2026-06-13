import { useRef } from 'react';
import { motion } from 'motion/react';
import ChalkInput from './ChalkInput';
import ChalkSelect from './ChalkSelect';
import StudentQuestions from './StudentQuestions';
import TeacherQuestions from './TeacherQuestions';

const FONT = "'Fredericka the Great', cursive";
const CHALK = '#F2EDD8';
const CHALK_DIM = 'rgba(242,237,216,0.35)';

const STUDENT_STEPS = new Set(['rollNumber', 'dateOfBirth']);
const TEACHER_STEPS = new Set(['subject', 'qualification', 'experience', 'assignedSections']);

const variants = {
  enter: (dir) => ({ x: dir > 0 ? '55%' : '-55%', opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? '-45%' : '45%',
    opacity: 0,
    transition: { duration: 0.28, ease: 'easeIn' },
  }),
};

function FileUpload({ onChange, current }) {
  const inputRef = useRef(null);
  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => onChange(e.target.files[0] || null)}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        {/* Chalk-drawn camera icon */}
        <div style={{
          width: '54px', height: '44px',
          border: `2px solid ${CHALK_DIM}`,
          borderRadius: '4px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          color: 'rgba(242,237,216,0.4)',
          fontSize: '1.4rem',
        }}>
          📷
        </div>
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            style={{
              fontFamily: FONT,
              background: 'transparent',
              border: `2px solid ${CHALK_DIM}`,
              color: CHALK,
              padding: '6px 18px',
              cursor: 'pointer',
              fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)',
              letterSpacing: '0.05em',
              display: 'block',
              marginBottom: '6px',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(242,237,216,0.8)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = CHALK_DIM; }}
          >
            CHOOSE PHOTO
          </button>
          <p style={{
            fontFamily: FONT,
            color: current ? CHALK : 'rgba(242,237,216,0.3)',
            fontSize: '0.78rem',
            margin: 0,
          }}>
            {current ? `📎 ${current.name}` : 'No image selected'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function QuestionSlide({
  stepId,
  config,
  stepIndex,
  totalSteps,
  direction,
  // RHF
  register,
  errors,
  watch,
  setValue,
  // local state for complex fields
  chips,
  setChips,
  sections,
  setSections,
  imageFile,
  setImageFile,
}) {
  const renderInput = () => {
    if (STUDENT_STEPS.has(stepId)) {
      return <StudentQuestions stepId={stepId} register={register} errors={errors} />;
    }
    if (TEACHER_STEPS.has(stepId)) {
      return (
        <TeacherQuestions
          stepId={stepId}
          register={register}
          errors={errors}
          chips={chips}
          setChips={setChips}
          sections={sections}
          setSections={setSections}
        />
      );
    }

    switch (config.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <ChalkInput
            type={config.type}
            placeholder={config.placeholder}
            error={errors[stepId]}
            {...register(stepId, config.required ? { required: `${config.label || 'This field'} is required` } : {})}
          />
        );

      case 'role':
        return (
          <ChalkSelect
            value={watch('role')}
            onChange={(v) => setValue('role', v, { shouldValidate: true })}
          />
        );

      case 'file':
        return <FileUpload onChange={setImageFile} current={imageFile} />;

      default:
        return null;
    }
  };

  const qNum = String(stepIndex + 1).padStart(2, '0');

  return (
    <motion.div
      key={stepId}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      style={{
        position: 'absolute',
        inset: 0,
        padding: 'clamp(20px,5%,48px) clamp(24px,8%,80px)',
        paddingBottom: 'clamp(56px,10%,80px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Question number */}
      <p style={{
        fontFamily: FONT,
        color: 'rgba(242,237,216,0.35)',
        fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)',
        marginBottom: '10px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}>
        Q.{qNum}
      </p>

      {/* Question text */}
      <h2 style={{
        fontFamily: FONT,
        color: CHALK,
        fontSize: 'clamp(1rem, 2.8vw, 1.85rem)',
        fontWeight: 400,
        marginBottom: '28px',
        lineHeight: 1.35,
        textShadow: '0 0 12px rgba(255,255,255,0.07)',
        maxWidth: '520px',
      }}>
        {config.q}
      </h2>

      {/* Input area */}
      {renderInput()}
    </motion.div>
  );
}
