import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  children,
  activeOpacity = 0.8,
  ...restProps
}) => {
  const getVariantContainerStyle = (): ViewStyle => {
    switch (variant) {
      case "primary":
        return styles.primaryContainer;
      case "secondary":
        return styles.secondaryContainer;
      case "outline":
        return styles.outlineContainer;
      case "ghost":
        return styles.ghostContainer;
      default:
        return styles.primaryContainer;
    }
  };

  const getVariantTextStyle = (): TextStyle => {
    switch (variant) {
      case "primary":
        return styles.primaryText;
      case "secondary":
        return styles.secondaryText;
      case "outline":
        return styles.outlineText;
      case "ghost":
        return styles.ghostText;
      default:
        return styles.primaryText;
    }
  };

  const getSizeContainerStyle = (): ViewStyle => {
    switch (size) {
      case "sm":
        return styles.smContainer;
      case "lg":
        return styles.lgContainer;
      case "md":
      default:
        return styles.mdContainer;
    }
  };

  const getSizeTextStyle = (): TextStyle => {
    switch (size) {
      case "sm":
        return styles.smText;
      case "lg":
        return styles.lgText;
      case "md":
      default:
        return styles.mdText;
    }
  };

  const spinnerColor =
    variant === "primary"
      ? "#FFFFFF"
      : variant === "secondary"
      ? "#D2D7DF"
      : "#4366F6";

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disabled || loading}
      style={[
        styles.baseContainer,
        getSizeContainerStyle(),
        getVariantContainerStyle(),
        disabled && styles.disabledContainer,
        style,
      ]}
      {...restProps}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {leftIcon ? <View style={styles.leftIconContainer}>{leftIcon}</View> : null}
          {title ? (
            <Text
              style={[
                styles.baseText,
                getSizeTextStyle(),
                getVariantTextStyle(),
                disabled && styles.disabledText,
                textStyle,
              ]}
            >
              {title}
            </Text>
          ) : (
            children
          )}
          {rightIcon ? <View style={styles.rightIconContainer}>{rightIcon}</View> : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  baseContainer: {
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  leftIconContainer: {
    marginRight: 8,
  },
  rightIconContainer: {
    marginLeft: 8,
  },
  baseText: {
    fontWeight: "600",
    textAlign: "center",
  },

  // Variants
  primaryContainer: {
    backgroundColor: "#4366F6",
  },
  primaryText: {
    color: "#FFFFFF",
  },

  secondaryContainer: {
    backgroundColor: "#414C5A",
  },
  secondaryText: {
    color: "#D3D8DF",
  },

  outlineContainer: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#4366F6",
  },
  outlineText: {
    color: "#4366F6",
  },

  ghostContainer: {
    backgroundColor: "transparent",
  },
  ghostText: {
    color: "#4366F6",
  },

  // Sizes
  smContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  smText: {
    fontSize: 14,
  },

  mdContainer: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  mdText: {
    fontSize: 16,
  },

  lgContainer: {
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 16,
  },
  lgText: {
    fontSize: 18,
  },

  // Disabled state
  disabledContainer: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.8,
  },
});
