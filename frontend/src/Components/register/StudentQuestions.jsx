import ChalkInput from './ChalkInput';

export default function StudentQuestions({ stepId, register, errors }) {
  if (stepId === 'rollNumber') {
    return (
      <ChalkInput
        placeholder="e.g. 42"
        error={errors.rollNumber}
        {...register('rollNumber')}
      />
    );
  }

  if (stepId === 'dateOfBirth') {
    return (
      <ChalkInput
        placeholder="DD / MM / YYYY"
        error={errors.dateOfBirth}
        {...register('dateOfBirth', { required: 'Date of birth is required' })}
      />
    );
  }

  return null;
}
