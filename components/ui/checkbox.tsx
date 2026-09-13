import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface CheckboxProps {
  checked: boolean;
  onPress?: () => void;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  boxStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onPress,
  onChange,
  label,
  containerStyle,
  boxStyle,
  labelStyle,
  disabled = false,
}) => {
  const handlePress = () => {
    if (disabled) return;
    if (onChange) onChange(!checked);
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, containerStyle]}
    >
      <View
        style={[
          styles.box,
          checked ? styles.boxChecked : styles.boxUnchecked,
          disabled && styles.boxDisabled,
          boxStyle,
        ]}
      >
        {checked && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
      </View>
      {typeof label === "string" ? (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      ) : (
        label
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  boxChecked: {
    backgroundColor: "#4366F6",
  },
  boxUnchecked: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#8E9CAE",
  },
  boxDisabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 14,
    color: "#FFFFFF",
  },
});
