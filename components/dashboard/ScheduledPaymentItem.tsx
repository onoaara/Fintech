import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface ScheduledPayment {
  id: string;
  name: string;
  nextPaymentDate: string;
  amount: string;
  currency?: string;
  icon: React.ReactNode;
}

export interface ScheduledPaymentItemProps {
  payment: ScheduledPayment;
  onPress?: () => void;
}

export const ScheduledPaymentItem: React.FC<ScheduledPaymentItemProps> = ({
  payment,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.leftRow}>
        <View style={styles.iconContainer}>{payment.icon}</View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{payment.name}</Text>
          <Text style={styles.dateLabel}>
            Next Payment:{" "}
            <Text style={styles.dateValue}>{payment.nextPaymentDate}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amount}>
          {payment.amount}
          <Text style={styles.currency}>{payment.currency || "USD"}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ScheduledPaymentItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 14,
  },
  textContainer: {
    justifyContent: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  dateLabel: {
    fontSize: 12,
    color: "#8E9CAE",
    fontWeight: "400",
  },
  dateValue: {
    color: "#3B66F5",
    fontWeight: "600",
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E293B",
  },
  currency: {
    fontSize: 10,
    fontWeight: "500",
    color: "#64748B",
    marginLeft: 3,
  },
});
