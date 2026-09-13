import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import {
  CreditCard,
  CardData,
  QuickActionCard,
  ServiceItem,
  ScheduledPaymentItem,
  ScheduledPayment,
  BottomNavBar,
  NavTab,
} from "../../components/dashboard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const DashboardScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeService, setActiveService] = useState("Gifts");

  const cards: CardData[] = [
    {
      id: "card-1",
      balance: "$4,228.76",
      cardNumber: "••••  ••••  ••••  8635",
      validFrom: "10/25",
      validThru: "10/30",
      cardHolder: "Will Jonas",
      theme: "blue",
    },
    {
      id: "card-2",
      balance: "$1,850.00",
      cardNumber: "••••  ••••  ••••  4219",
      validFrom: "01/26",
      validThru: "01/31",
      cardHolder: "Will Jonas",
      theme: "green",
    },
  ];

  const quickActions = [
    {
      id: "transfer",
      title: "Money Transfer",
      iconBgColor: "#D1FAE5",
      icon: <Ionicons name="swap-horizontal" size={26} color="#059669" />,
    },
    {
      id: "bill",
      title: "Pay Bill",
      iconBgColor: "#EEF2FF",
      icon: <Ionicons name="receipt-outline" size={24} color="#6366F1" />,
    },
    {
      id: "bank",
      title: "Bank to Bank",
      iconBgColor: "#F1F5F9",
      icon: <Ionicons name="business-outline" size={24} color="#64748B" />,
    },
  ];

  const services = [
    {
      id: "Recharge",
      label: "Recharge",
      icon: (isActive: boolean) => (
        <Ionicons
          name="phone-portrait-outline"
          size={24}
          color={isActive ? "#FFFFFF" : "#64748B"}
        />
      ),
    },
    {
      id: "Charity",
      label: "Charity",
      icon: (isActive: boolean) => (
        <Ionicons
          name="heart-outline"
          size={24}
          color={isActive ? "#FFFFFF" : "#64748B"}
        />
      ),
    },
    {
      id: "Loan",
      label: "Loan",
      icon: (isActive: boolean) => (
        <MaterialCommunityIcons
          name="hand-coin-outline"
          size={24}
          color={isActive ? "#FFFFFF" : "#64748B"}
        />
      ),
    },
    {
      id: "Gifts",
      label: "Gifts",
      icon: (isActive: boolean) => (
        <Ionicons
          name="gift-outline"
          size={24}
          color={isActive ? "#FFFFFF" : "#64748B"}
        />
      ),
    },
    {
      id: "Insurance",
      label: "Insurance",
      icon: (isActive: boolean) => (
        <Ionicons
          name="shield-checkmark-outline"
          size={24}
          color={isActive ? "#FFFFFF" : "#64748B"}
        />
      ),
    },
  ];

  const scheduledPayments: ScheduledPayment[] = [
    {
      id: "netflix",
      name: "Netflix",
      nextPaymentDate: "12/04",
      amount: "$1.00",
      currency: "USD",
      icon: (
        <View style={[styles.brandIconBox, { backgroundColor: "#141414" }]}>
          <Text style={styles.netflixText}>N</Text>
        </View>
      ),
    },
    {
      id: "paypal",
      name: "Paypal",
      nextPaymentDate: "14/04",
      amount: "$3.50",
      currency: "USD",
      icon: (
        <View style={[styles.brandIconBox, { backgroundColor: "#EBF3FE" }]}>
          <FontAwesome5 name="paypal" size={24} color="#00457C" />
        </View>
      ),
    },
    {
      id: "spotify",
      name: "Spotify",
      nextPaymentDate: "13/04",
      amount: "$10.00",
      currency: "USD",
      icon: (
        <View style={[styles.brandIconBox, { backgroundColor: "#1DB954" }]}>
          <FontAwesome5 name="spotify" size={24} color="#FFFFFF" />
        </View>
      ),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Top Header */}
      <View style={styles.header}>
        {/* User Avatar with online indicator */}
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../assets/img/user_avatar.jpg")}
            style={styles.avatar}
          />
          <View style={styles.onlineDot} />
        </View>

        {/* Center Title */}
        <Text style={styles.headerTitle}>Fintech</Text>

        {/* Notification Bell with alert dot */}
        <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={22} color="#334155" />
          <View style={styles.bellBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Credit Card Carousel */}
        <View style={styles.cardSection}>
          <ScrollView
            horizontal
            pagingEnabled={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardScrollContainer}
            snapToInterval={SCREEN_WIDTH * 0.86 + 14}
            decelerationRate="fast"
            onScroll={(e) => {
              const xOffset = e.nativeEvent.contentOffset.x;
              const newIndex = Math.round(xOffset / (SCREEN_WIDTH * 0.8));
              if (newIndex !== activeCardIndex && newIndex >= 0 && newIndex < cards.length) {
                setActiveCardIndex(newIndex);
              }
            }}
            scrollEventThrottle={16}
          >
            {cards.map((card, index) => (
              <View
                key={card.id}
                style={[
                  styles.cardWrapper,
                  index < cards.length - 1 && { marginRight: 14 },
                ]}
              >
                <CreditCard card={card} />
              </View>
            ))}
          </ScrollView>

          {/* Carousel Indicators */}
          <View style={styles.indicatorsRow}>
            <View
              style={[
                styles.indicatorPill,
                activeCardIndex === 0
                  ? styles.indicatorActive
                  : styles.indicatorInactive,
              ]}
            />
            <View
              style={[
                styles.indicatorDot,
                activeCardIndex === 1
                  ? styles.indicatorActiveDot
                  : styles.indicatorInactive,
              ]}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsScroll}
          >
            {quickActions.map((action) => (
              <QuickActionCard
                key={action.id}
                title={action.title}
                icon={action.icon}
                iconBgColor={action.iconBgColor}
              />
            ))}
          </ScrollView>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesScroll}
          >
            {services.map((service) => {
              const isActive = activeService === service.id;
              return (
                <ServiceItem
                  key={service.id}
                  label={service.label}
                  isActive={isActive}
                  icon={service.icon(isActive)}
                  onPress={() => setActiveService(service.id)}
                />
              );
            })}
          </ScrollView>
        </View>

        {/* Schedule Payments */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Schedule Payments</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.paymentsList}>
            {scheduledPayments.map((payment) => (
              <ScheduledPaymentItem key={payment.id} payment={payment} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavBar activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "#F8FAFC",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E2E8F0",
  },
  onlineDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EF4444",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EFF2F7",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  bellBadge: {
    position: "absolute",
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    borderWidth: 1.5,
    borderColor: "#EFF2F7",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  cardSection: {
    marginTop: 6,
    marginBottom: 16,
  },
  cardScrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  cardWrapper: {},
  indicatorsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    gap: 6,
  },
  indicatorPill: {
    width: 20,
    height: 4,
    borderRadius: 2,
  },
  indicatorDot: {
    width: 6,
    height: 4,
    borderRadius: 2,
  },
  indicatorActive: {
    backgroundColor: "#3B66F5",
  },
  indicatorActiveDot: {
    backgroundColor: "#3B66F5",
  },
  indicatorInactive: {
    backgroundColor: "#CBD5E1",
  },
  section: {
    marginTop: 18,
    paddingHorizontal: 20,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 14,
  },
  viewAllText: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "500",
  },
  quickActionsScroll: {
    paddingRight: 10,
    paddingBottom: 6,
  },
  servicesScroll: {
    paddingRight: 10,
    paddingBottom: 6,
  },
  paymentsList: {
    marginTop: 2,
  },
  brandIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  netflixText: {
    fontSize: 26,
    fontWeight: "900",
    color: "#E50914",
  },
});
