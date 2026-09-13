import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
export const CARD_WIDTH = Math.min(SCREEN_WIDTH * 0.86, 350);

export interface CardData {
  id: string;
  balance: string;
  cardNumber: string;
  validFrom: string;
  validThru: string;
  cardHolder: string;
  theme?: "blue" | "green";
}

export interface CreditCardProps {
  card: CardData;
}

export const CreditCard: React.FC<CreditCardProps> = ({ card }) => {
  const isGreen = card.theme === "green";

  return (
    <View
      style={[
        styles.cardContainer,
        isGreen ? styles.greenCard : styles.blueCard,
      ]}
    >
      {/* Decorative background curves */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />

      {/* Top Row: Balance & EMV Chip */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>{card.balance}</Text>
        </View>

        {/* Golden EMV Chip */}
        <View style={styles.chip}>
          <View style={styles.chipInnerGrid}>
            <View style={styles.chipLineH} />
            <View style={styles.chipLineV} />
          </View>
        </View>
      </View>

      {/* Middle: Masked Card Number */}
      <View style={styles.cardNumberContainer}>
        <Text style={styles.cardNumber}>{card.cardNumber}</Text>
      </View>

      {/* Bottom Info: Dates, Cardholder & Brand Logo */}
      <View style={styles.bottomRow}>
        <View style={styles.cardDetails}>
          <View style={styles.validDatesRow}>
            <Text style={styles.validText}>
              Valid From <Text style={styles.validValue}>{card.validFrom}</Text>
            </Text>
            <Text style={styles.validText}>
              Valid Thru <Text style={styles.validValue}>{card.validThru}</Text>
            </Text>
          </View>
          <Text style={styles.holderLabel}>Card Holder</Text>
          <Text style={styles.holderName}>{card.cardHolder}</Text>
        </View>

        {/* Mastercard Logo (overlapping circles) */}
        <View style={styles.mastercardLogo}>
          <View style={[styles.mcCircle, styles.mcRed]} />
          <View style={[styles.mcCircle, styles.mcOrange]} />
        </View>
      </View>
    </View>
  );
};

export default CreditCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: 195,
    borderRadius: 22,
    padding: 20,
    justifyContent: "space-between",
    overflow: "hidden",
    shadowColor: "#4366F6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 8,
  },
  blueCard: {
    backgroundColor: "#3B66F5",
  },
  greenCard: {
    backgroundColor: "#10B981",
  },
  decorativeCircle1: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    top: -50,
    right: -40,
  },
  decorativeCircle2: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    bottom: -100,
    left: -40,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  balanceLabel: {
    fontSize: 13,
    color: "#E0E7FF",
    fontWeight: "400",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  chip: {
    width: 36,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#F5C842",
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5B229",
  },
  chipInnerGrid: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  chipLineH: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  chipLineV: {
    position: "absolute",
    height: "100%",
    width: 1,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  cardNumberContainer: {
    marginVertical: 4,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 2.2,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardDetails: {
    flex: 1,
  },
  validDatesRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 6,
  },
  validText: {
    fontSize: 10,
    color: "#E0E7FF",
  },
  validValue: {
    fontWeight: "600",
    color: "#FFFFFF",
  },
  holderLabel: {
    fontSize: 10,
    color: "#CBD5E1",
    marginBottom: 1,
  },
  holderName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  mastercardLogo: {
    flexDirection: "row",
    alignItems: "center",
    width: 44,
    height: 28,
  },
  mcCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  mcRed: {
    backgroundColor: "#EB001B",
    zIndex: 1,
  },
  mcOrange: {
    backgroundColor: "#F79E1B",
    marginLeft: -10,
  },
});
