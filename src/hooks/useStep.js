import { useCallback, useState } from 'react';

import usePreviousState from './usePreviousState';

const useStep = initialStep => {
  const [step, setStep] = useState(initialStep);
  const prevStep = usePreviousState(step);

  const handleNextStepClick = useCallback(
    () => {
      setStep(step + 1);
    },
    [step],
  );

  const handlePrevStepClick = useCallback(
    () => {
      setStep(step - 1);
    },
    [step],
  );

  return {
    step,
    prevStep,
    setStep,
    goToNextStep: handleNextStepClick,
    goToPrevStep: handlePrevStepClick,
  };
};

export default useStep;
