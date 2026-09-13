import React from "react";
import { OnboardingSlide } from "../../components/onboarding/OnboardingSlide";

interface OnboardingScreenOneProps {
  onSkip?: () => void;
  onNext?: () => void;
  onStepChange?: (step: number) => void;
}

export const OnboardingScreenOne: React.FC<OnboardingScreenOneProps> = ({
  onSkip,
  onNext,
  onStepChange,
}) => {
  return (
    <OnboardingSlide
      imageSource={require("../../assets/img/onboardingCards.png")}
      titlePrefix={`Manage Your\nPayments with`}
      highlightedTitle="mobile banking"
      subtitle="A convenient way to manage your money securely from mobile device."
      currentStep={0}
      totalSteps={2}
      onSkip={onSkip || onNext}
      onStepChange={onStepChange}
      skipButtonText="Skip"
    />
  );
};

export default OnboardingScreenOne;
