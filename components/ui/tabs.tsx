import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export type TabVariant = "pill" | "solid" | "bordered" | "underlined" | "light";
export type TabColor = "primary" | "default" | "white";
export type TabSize = "sm" | "md" | "lg";

export interface TabItem {
  key: string | number;
  title?: string | React.ReactNode;
  disabled?: boolean;
}

export interface TabProps {
  key: string | number;
  title?: string | React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Tab: React.FC<TabProps> = () => {
  return null;
};

export interface TabsProps {
  selectedKey?: string | number;
  defaultSelectedKey?: string | number;
  onSelectionChange?: (key: string | number) => void;
  variant?: TabVariant;
  color?: TabColor;
  size?: TabSize;
  items?: TabItem[];
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  activeTabStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
}

export const Tabs: React.FC<TabsProps> = ({
  selectedKey,
  defaultSelectedKey,
  onSelectionChange,
  variant = "pill",
  color = "white",
  size = "md",
  items,
  children,
  style,
  tabStyle,
  activeTabStyle,
  textStyle,
  activeTextStyle,
}) => {
  const [internalSelectedKey, setInternalSelectedKey] = React.useState<
    string | number
  >(defaultSelectedKey ?? (items?.[0]?.key || 0));

  const currentKey = selectedKey !== undefined ? selectedKey : internalSelectedKey;

  // Collect items from props or children
  const tabItems: TabItem[] = React.useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }
    const extracted: TabItem[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        extracted.push({
          key: child.key ?? extracted.length,
          title: (child.props as any).title,
          disabled: (child.props as any).disabled,
        });
      }
    });
    return extracted;
  }, [items, children]);

  const handleSelect = (key: string | number, disabled?: boolean) => {
    if (disabled) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (selectedKey === undefined) {
      setInternalSelectedKey(key);
    }
    onSelectionChange?.(key);
  };

  // Render Pill variant (HeroUI / Pagination style)
  if (variant === "pill") {
    return (
      <View style={[styles.pillContainer, style]}>
        {tabItems.map((item) => {
          const isSelected = String(item.key) === String(currentKey);
          return (
            <TouchableOpacity
              key={String(item.key)}
              activeOpacity={0.7}
              disabled={item.disabled}
              onPress={() => handleSelect(item.key, item.disabled)}
              style={[
                styles.pillBase,
                isSelected ? styles.pillActive : styles.pillInactive,
                tabStyle,
                isSelected && activeTabStyle,
              ]}
            >
              {item.title ? (
                <Text
                  style={[
                    styles.pillText,
                    isSelected ? styles.pillActiveText : styles.pillInactiveText,
                    textStyle,
                    isSelected && activeTextStyle,
                  ]}
                >
                  {item.title}
                </Text>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  // Render Solid / Bordered / Underlined / Light variants
  return (
    <View
      style={[
        styles.tabsContainer,
        variant === "solid" && styles.solidContainer,
        variant === "bordered" && styles.borderedContainer,
        style,
      ]}
    >
      {tabItems.map((item) => {
        const isSelected = String(item.key) === String(currentKey);
        return (
          <TouchableOpacity
            key={String(item.key)}
            activeOpacity={0.7}
            disabled={item.disabled}
            onPress={() => handleSelect(item.key, item.disabled)}
            style={[
              styles.tabButton,
              variant === "solid" && isSelected && styles.solidActiveTab,
              variant === "underlined" && isSelected && styles.underlinedActiveTab,
              tabStyle,
              isSelected && activeTabStyle,
            ]}
          >
            {typeof item.title === "string" ? (
              <Text
                style={[
                  styles.tabText,
                  isSelected && styles.tabActiveText,
                  textStyle,
                  isSelected && activeTextStyle,
                ]}
              >
                {item.title}
              </Text>
            ) : (
              item.title
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  // Pill variant (Pagination / Step indicators)
  pillContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pillBase: {
    height: 4,
    borderRadius: 2,
  },
  pillActive: {
    width: 44,
    backgroundColor: "#FFFFFF",
  },
  pillInactive: {
    width: 20,
    backgroundColor: "#404C5A",
  },
  pillText: {
    fontSize: 12,
  },
  pillActiveText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  pillInactiveText: {
    color: "#8E9CAE",
  },

  // Standard HeroUI style container variants
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  solidContainer: {
    backgroundColor: "#2B3642",
    borderRadius: 12,
    padding: 4,
  },
  borderedContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#404C5A",
    padding: 4,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  solidActiveTab: {
    backgroundColor: "#4366F6",
  },
  underlinedActiveTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#4366F6",
  },
  tabText: {
    fontSize: 14,
    color: "#8E9CAE",
    fontWeight: "500",
  },
  tabActiveText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
