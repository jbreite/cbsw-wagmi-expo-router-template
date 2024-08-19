import { useCallback } from "react";
import * as Haptics from "expo-haptics";

type ImpactStyle = Haptics.ImpactFeedbackStyle;
type NotificationType = Haptics.NotificationFeedbackType;

const useHaptics = () => {
  const triggerImpact = useCallback(
    (style: ImpactStyle = Haptics.ImpactFeedbackStyle.Medium) => {
      Haptics.impactAsync(style);
    },
    []
  );

  const triggerNotification = useCallback(
    (type: NotificationType = Haptics.NotificationFeedbackType.Success) => {
      Haptics.notificationAsync(type);
    },
    []
  );

  const triggerSelection = useCallback(() => {
    Haptics.selectionAsync();
  }, []);

  return {
    triggerImpact,
    triggerNotification,
    triggerSelection,
    ImpactFeedbackStyle: Haptics.ImpactFeedbackStyle,
    NotificationFeedbackType: Haptics.NotificationFeedbackType,
  };
};

export default useHaptics;
