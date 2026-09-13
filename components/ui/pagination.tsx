import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";

interface PaginationProps {
  totalSteps?: number;
  currentStep: number; // 0-indexed (e.g., 0 for screen 1, 1 for screen 2)
  style?: StyleProp<ViewStyle>;
  activeColor?: string;
  inactiveColor?: string;
}

export const PaginationIndicator: React.FC<PaginationProps> = ({
  totalSteps = 2,
  currentStep = 0,
  style,
  activeColor = "#FFFFFF",
  inactiveColor = "#404C5A",
}) => {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index === currentStep;
        return (
          <View
            key={index}
            style={[
              styles.dot,
              isActive
                ? [styles.activeDot, { backgroundColor: activeColor }]
                : [styles.inactiveDot, { backgroundColor: inactiveColor }],
            ]}
          />
        );
      })}
    </View>
  );
};

export default PaginationIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
  activeDot: {
    width: 44,
  },
  inactiveDot: {
    width: 20,
  },
});
