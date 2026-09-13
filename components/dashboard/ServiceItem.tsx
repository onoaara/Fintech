import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";

export interface ServiceItemProps {
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({
  label,
  icon,
  isActive = false,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <View
        style={[
          styles.iconBox,
          isActive ? styles.iconBoxActive : styles.iconBoxInactive,
        ]}
      >
        {icon}
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ServiceItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 66,
    marginRight: 10,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  iconBoxInactive: {
    backgroundColor: "#EFF2F7",
  },
  iconBoxActive: {
    backgroundColor: "#3B66F5",
    shadowColor: "#3B66F5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
    textAlign: "center",
  },
});
