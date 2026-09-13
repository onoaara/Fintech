import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  Dimensions,
  ImageStyle,
  StyleProp,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "../ui/button";
import { Tabs } from "../ui/tabs";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export interface OnboardingSlideProps {
  imageSource: ImageSourcePropType;
  titlePrefix: string;
  highlightedTitle: string;
  subtitle: string;
  currentStep: number;
  totalSteps?: number;
  onSkip?: () => void;
  onNext?: () => void;
  onStepChange?: (step: number) => void;
  skipButtonText?: string;
  imageStyle?: StyleProp<ImageStyle>;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  imageSource,
  titlePrefix,
  highlightedTitle,
  subtitle,
  currentStep,
  totalSteps = 2,
  onSkip,
  onStepChange,
  skipButtonText = "Skip",
  imageStyle,
}) => {
  // Generate tab items for HeroUI Tabs
  const tabItems = Array.from({ length: totalSteps }).map((_, idx) => ({
    key: idx,
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Top Full Bleed Illustration Container */}
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={[styles.image, imageStyle]}
          resizeMode="cover"
        />
      </View>

      {/* Bottom Content Area */}
      <SafeAreaView style={styles.contentSafeArea}>
        <View style={styles.bottomContent}>
          {/* Title */}
          <Text style={styles.title}>
            {titlePrefix}
            {"\n"}
            <Text style={styles.highlightText}>{highlightedTitle}</Text>
          </Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>{subtitle}</Text>

          {/* Bottom Controls Row: HeroUI Tabs Indicator + Action Button */}
          <View style={styles.footerRow}>
            <Tabs
              variant="pill"
              items={tabItems}
              selectedKey={currentStep}
              onSelectionChange={(key) => onStepChange?.(Number(key))}
            />

            <Button
              title={skipButtonText}
              variant="secondary"
              onPress={onSkip}
              style={styles.skipButton}
              textStyle={styles.skipButtonText}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OnboardingSlide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D2631",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.62,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentSafeArea: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomContent: {
    paddingHorizontal: 28,
    paddingBottom: 28,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  highlightText: {
    color: "#4366F6",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 15,
    color: "#8E9CAE",
    lineHeight: 22,
    marginTop: 16,
    letterSpacing: -0.2,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 36,
  },
  skipButton: {
    minWidth: 92,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "#404C5A",
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#D3D8DF",
  },
});
