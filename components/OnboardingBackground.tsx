import React from 'react';
import { StyleSheet, View, useWindowDimensions, StyleProp, ViewStyle } from 'react-native';

export interface OnboardingBackgroundProps {
  children?: React.ReactNode;
  circlePosition?: 'center' | 'top-right';
  containerStyle?: StyleProp<ViewStyle>;
}

export const OnboardingBackground: React.FC<OnboardingBackgroundProps> = ({
  children,
  circlePosition = 'center',
  containerStyle,
}) => {
  const { width } = useWindowDimensions();

  // Proportions calculated from reference design (473 x 1024 base)
  // Outer ring radius ~422px (diameter 844px ~ 1.784x width)
  // Middle ring radius ~257px (diameter 514px ~ 1.087x width)
  // Inner circle radius ~153px (diameter 306px ~ 0.647x width)
  const outerDiameter = Math.round(width * 1.784);
  const middleDiameter = Math.round(width * 1.087);
  const innerDiameter = Math.round(width * 0.647);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Background concentric circles */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View
          style={[
            styles.centerContainer,
            circlePosition === 'top-right' && styles.topRightContainer,
          ]}
        >
          {/* Outer Ring */}
          <View
            style={[
              styles.circle,
              {
                width: outerDiameter,
                height: outerDiameter,
                borderRadius: outerDiameter / 2,
                backgroundColor: '#27343F',
              },
            ]}
          >
            {/* Middle Ring */}
            <View
              style={[
                styles.circle,
                {
                  width: middleDiameter,
                  height: middleDiameter,
                  borderRadius: middleDiameter / 2,
                  backgroundColor: '#2B3842',
                },
              ]}
            >
              {/* Inner Circle */}
              <View
                style={[
                  styles.circle,
                  {
                    width: innerDiameter,
                    height: innerDiameter,
                    borderRadius: innerDiameter / 2,
                    backgroundColor: '#2F3B45',
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Screen content slot */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23303B',
    overflow: 'hidden',
  },
  centerContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    top: -160,
    right: -140,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnboardingBackground;
