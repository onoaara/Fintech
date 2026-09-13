import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";

export interface QuickActionCardProps {
  title: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  icon,
  iconBgColor = "#E6FAF5",
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.card, style]}
    >
      <View style={[styles.iconWrapper, { backgroundColor: iconBgColor }]}>
        {icon}
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default QuickActionCard;

const styles = StyleSheet.create({
  card: {
    width: 122,
    height: 120,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E293B",
    textAlign: "center",
  },
});
