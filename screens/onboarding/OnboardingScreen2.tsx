import React from "react";
import { OnboardingSlide } from "../../components/onboarding/OnboardingSlide";

interface OnboardingScreenTwoProps {
  onSkip?: () => void;
  onNext?: () => void;
  onStepChange?: (step: number) => void;
}

export const OnboardingScreenTwo: React.FC<OnboardingScreenTwoProps> = ({
  onSkip,
  onNext,
  onStepChange,
}) => {
  return (
    <OnboardingSlide
      imageSource={require("../../assets/img/onboardingCards2.png")}
      titlePrefix={`A loan for every\ndream with`}
      highlightedTitle="mobile banking"
      subtitle="A loan facility that provides you financial assistance whenever you need."
      currentStep={1}
      totalSteps={2}
      onSkip={onSkip || onNext}
      onStepChange={onStepChange}
      skipButtonText="Skip"
    />
  );
};

export default OnboardingScreenTwo;
