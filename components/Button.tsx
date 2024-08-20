import React from "react";
import { StyleSheet, Text, ViewStyle, ActivityIndicator } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useHaptics from "@/hooks/useHaptics";
import { AnimatedPressable } from "./Animated/AnimatedPressable";

export default function Button({
  onPress,
  label,
  disabled,
  isLoading,
  isLoadingText,
  style,
}: {
  onPress: () => void;
  label: string;
  style?: ViewStyle;
  disabled?: boolean;
  isLoading?: boolean;
  isLoadingText?: string;
}) {
  const isActive = useSharedValue(false);
  const { triggerImpact, ImpactFeedbackStyle } = useHaptics();

  const rButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(isActive.value ? 0.96 : 1, { duration: 100 }),
        },
      ],
    };
  }, []);

  const handlePressIn = () => {
    isActive.value = true;
    triggerImpact(ImpactFeedbackStyle.Medium);
  };

  const handlePressOut = () => {
    isActive.value = false;
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[styles.button, rButtonStyle, style]}
    >
      {isLoading && <ActivityIndicator size="small" color="white" />}
      <Text style={styles.buttonText}>{isLoading ? isLoadingText : label}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0073FB",
    padding: 16,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    // width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
