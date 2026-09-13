import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type NavTab = "home" | "location" | "scan" | "analytics" | "menu";

export interface BottomNavBarProps {
  activeTab?: NavTab;
  onTabPress?: (tab: NavTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab = "home",
  onTabPress,
}) => {
  const tabs: { id: NavTab; iconName: keyof typeof Ionicons.glyphMap }[] = [
    { id: "home", iconName: "home" },
    { id: "location", iconName: "location-outline" },
    { id: "scan", iconName: "scan-outline" },
    { id: "analytics", iconName: "trending-up-outline" },
    { id: "menu", iconName: "grid-outline" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.7}
              onPress={() => onTabPress?.(tab.id)}
              style={styles.tabButton}
            >
              <Ionicons
                name={tab.iconName}
                size={24}
                color={isActive ? "#3B66F5" : "#94A3B8"}
              />
              {isActive && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default BottomNavBar;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFFFFF",
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    minHeight: 44,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#3B66F5",
    marginTop: 4,
  },
});
