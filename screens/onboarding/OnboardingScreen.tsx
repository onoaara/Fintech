import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { OnboardingScreenOne } from "./OnboardingScreen1";
import { OnboardingScreenTwo } from "./OnboardingScreen2";

interface OnboardingScreenProps {
  onFinish?: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onFinish }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else {
      if (onFinish) {
        onFinish();
      } else {
        setCurrentStep(0);
      }
    }
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <View style={styles.container}>
      {currentStep === 0 ? (
        <OnboardingScreenOne
          onNext={handleNext}
          onSkip={handleNext}
          onStepChange={handleStepChange}
        />
      ) : (
        <OnboardingScreenTwo
          onNext={handleNext}
          onSkip={handleNext}
          onStepChange={handleStepChange}
        />
      )}
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D2631",
  },
});
