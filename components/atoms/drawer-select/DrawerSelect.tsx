import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

import { styles } from './styles';
import type { DrawerSelectProps } from './types';

const DISMISS_THRESHOLD = 80;
const DISMISS_VELOCITY = 500;

export function DrawerSelect<T extends string = string>({
  value,
  options,
  onChange,
  title,
}: DrawerSelectProps<T>) {
  const [open, setOpen] = useState(false);

  const drawerBackground = useThemeColor({}, 'background');
  // Inverted: pill background = text color (dark on light, light on dark)
  const defaultPillBackground = useThemeColor({}, 'text');
  const defaultPillTextColor = useThemeColor({}, 'background');

  const selected = options.find((o) => o.value === value) ?? options[0];

  // Use the selected option's type color when available
  const pillBackground = selected.color ?? defaultPillBackground;
  const pillTextColor = selected.textColor ?? (selected.color ? '#FFFFFF' : defaultPillTextColor);

  const translateY = useSharedValue(0);

  const close = () => {
    translateY.value = 0;
    setOpen(false);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      // Only allow dragging downward
      translateY.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      if (e.translationY > DISMISS_THRESHOLD || e.velocityY > DISMISS_VELOCITY) {
        runOnJS(close)();
      } else {
        translateY.value = withSpring(0, { damping: 20 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <>
      <Pressable
        style={[styles.pill, { backgroundColor: pillBackground }]}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={title}
      >
        <Text style={[styles.pillText, { color: pillTextColor }]}>{selected.label}</Text>
        <Ionicons name="chevron-down" size={14} color={pillTextColor} />
      </Pressable>

      <Modal visible={open} transparent animationType="slide" onRequestClose={close}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.backdrop} onPress={close} />
          <Animated.View style={[styles.drawer, { backgroundColor: drawerBackground }, animatedStyle]}>
            <GestureDetector gesture={panGesture}>
              <View style={styles.dragArea}>
                <View style={styles.handle} />
                {title && (
                  <Text style={[styles.title, { color: defaultPillBackground }]}>{title}</Text>
                )}
              </View>
            </GestureDetector>
            <ScrollView
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            >
              {options.map((option) => (
                <Pressable
                  key={option.value}
                  style={[
                    styles.option,
                    { backgroundColor: option.color ?? defaultPillBackground },
                  ]}
                  onPress={() => {
                    onChange(option.value);
                    close();
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={option.label}
                  accessibilityState={{ selected: option.value === value }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: option.textColor ?? (option.color ? '#FFFFFF' : defaultPillTextColor) },
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}
