import { useState, useMemo, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../api/axios';
import ClassroomScene    from '../Components/register/ClassroomScene';
import Blackboard        from '../Components/register/Blackboard';
import QuestionSlide     from '../Components/register/QuestionSlide';
import ReviewStep        from '../Components/register/ReviewStep';
import NavigationArrows  from '../Components/register/NavigationArrows';

/* ─── Step config (module-level, stable) ─── */
const BASE_STEPS = [
  { id: 'fullName',    q: 'What is your full name?',          type: 'text',     placeholder: 'Type your name here…', required: true,  label: 'Full Name' },
  { id: 'email',       q: 'What is your email address?',      type: 'email',    placeholder: 'your@email.com',        required: true,  label: 'Email' },
  { id: 'password',    q: 'Create your password',             type: 'password', placeholder: '••••••••',              required: true,  label: 'Password' },
  { id: 'role',        q: 'Select your role',                 type: 'role',     required: true,  label: 'Role' },
  { id: 'schoolId',    q: 'Enter your School ID',             type: 'text',     placeholder: 'e.g. SCH-2024-001',    required: true,  label: 'School ID' },
  { id: 'userImage',   q: 'Upload your profile image',        type: 'file',     required: true,  label: 'Photo' },
  { id: 'className',   q: 'What is your class?',             type: 'text',     placeholder: 'e.g. Class 10',         required: false, label: 'Class' },
  { id: 'sectionName', q: 'Which section do you belong to?', type: 'text',     placeholder: 'e.g. Section A',       required: false, label: 'Section' },
];

const STUDENT_STEPS = [
  { id: 'rollNumber',  q: 'What is your roll number?',        type: 'text',     placeholder: 'e.g. 42',              required: false, label: 'Roll Number' },
  { id: 'dateOfBirth', q: 'What is your date of birth?',     type: 'date',     placeholder: '',                     required: true,  label: 'Date of Birth' },
];

const TEACHER_STEPS = [
  { id: 'subject',          q: 'What subject do you teach?',                 type: 'text',     placeholder: 'e.g. Mathematics', required: true,  label: 'Subject' },
  { id: 'qualification',    q: 'What are your qualifications?',              type: 'chips',                                       required: false, label: 'Qualifications' },
  { id: 'experience',       q: 'How many years of experience do you have?',  type: 'text',     placeholder: 'e.g. 5 years',    required: false, label: 'Experience' },
  { id: 'assignedSections', q: 'Which sections are assigned to you?',        type: 'sections',                                    required: false, label: 'Sections' },
];

const REVIEW_STEP = { id: 'review', type: 'review' };

export default function RegisterUser() {
  const navigate = useNavigate();
  const { register, watch, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: { role: '' },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection]     = useState(1);

  const [chips, setChips]       = useState([]);
  const [sections, setSections] = useState([{ className: '', sectionName: '' }]);
  const [imageFile, setImageFile] = useState(null);

  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError]     = useState(null);
  const [regSuccess, setRegSuccess] = useState(false);

  const role = watch('role');

  const steps = useMemo(() => {
    const base = [...BASE_STEPS];
    if (role === 'teacher') return [...base, ...TEACHER_STEPS, REVIEW_STEP];
    return [...base, ...STUDENT_STEPS, REVIEW_STEP];
  }, [role]);

  useEffect(() => {
    if (currentStep >= steps.length) setCurrentStep(steps.length - 1);
  }, [steps.length]);

  const totalSteps    = steps.length;
  const currentConfig = steps[currentStep];
  const isReview      = currentConfig?.id === 'review';

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, totalSteps - 1));
  }, [totalSteps]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 0));
  }, []);

  const stepLabel = isReview
    ? 'Review'
    : `${currentStep + 1} / ${totalSteps - 1}`;

  const handleRegister = useCallback(async () => {
    if (regLoading || regSuccess) return;

    const values = getValues();

    if (!imageFile) {
      setRegError('Please upload your profile photo before submitting.');
      return;
    }

    setRegLoading(true);
    setRegError(null);

    try {
      const fd = new FormData();

      const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

      if (values.fullName?.trim())   fd.append('fullName', values.fullName.trim());
      if (values.email?.trim())      fd.append('email', values.email.trim());
      if (values.password)           fd.append('password', values.password);
      fd.append('role', capitalize(values.role));
      if (values.schoolId?.trim())   fd.append('schoolId', values.schoolId.trim());
      if (values.className?.trim())  fd.append('className', values.className.trim());
      if (values.sectionName?.trim()) fd.append('sectionName', values.sectionName.trim());

      if (values.role === 'student') {
        if (values.rollNumber?.trim())  fd.append('rollNumber', values.rollNumber.trim());
        if (values.dateOfBirth?.trim()) fd.append('dob', values.dateOfBirth.trim());
      }

      if (values.role === 'teacher') {
        if (values.subject?.trim())    fd.append('subject', values.subject.trim());
        if (values.experience?.trim()) fd.append('experience', values.experience.trim());
      }

      fd.append('userImage', imageFile);

      await axiosInstance.post('/users/register', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setRegSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1400);
    } catch (err) {
      setRegError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setRegLoading(false);
    }
  }, [regLoading, regSuccess, getValues, imageFile, navigate]);

  const reviewData = {
    ...getValues(),
    userImage: imageFile,
    qualifications: chips,
    assignedSections: sections,
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Pure classroom background — never re-renders after mount */}
      <ClassroomScene />

      {/* Board overlay — in normal flow, flex-centered, z-index above ClassroomScene */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(24px,5vh,60px) clamp(12px,3vw,40px)',
      }}>
        <div style={{ width: '100%', maxWidth: '1100px' }}>
          <Blackboard
            stepIndex={currentStep}
            totalSteps={totalSteps}
            stepLabel={stepLabel}
          >
            <AnimatePresence mode="wait" custom={direction}>
              {isReview ? (
                <ReviewStep
                  key="review"
                  data={reviewData}
                  direction={direction}
                  onSubmit={handleRegister}
                  isLoading={regLoading}
                  error={regError}
                  success={regSuccess}
                />
              ) : (
                <QuestionSlide
                  key={currentConfig.id}
                  stepId={currentConfig.id}
                  config={currentConfig}
                  stepIndex={currentStep}
                  totalSteps={totalSteps}
                  direction={direction}
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  chips={chips}
                  setChips={setChips}
                  sections={sections}
                  setSections={setSections}
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                />
              )}
            </AnimatePresence>

            <NavigationArrows
              onPrev={goPrev}
              onNext={goNext}
              canPrev={currentStep > 0}
              canNext={currentStep < totalSteps - 1}
              isLast={currentStep === totalSteps - 2}
            />
          </Blackboard>
        </div>
      </div>
    </div>
  );
}
