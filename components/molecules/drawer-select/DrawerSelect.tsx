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

import { Colors } from '@/constants/theme';

import { styles } from './styles';
import type { DrawerSelectProps } from './types';

const DISMISS_THRESHOLD = 80;
const DISMISS_VELOCITY = 500;

export function DrawerSelect<T extends string = string>({
   value,
   options,
   onChange,
   title,
   type = 'default',
   icon,
}: DrawerSelectProps<T>) {
   const [open, setOpen] = useState(false);

   const selected = options.find((o) => o.value === value) ?? options[0];

   const pillBackground = selected.color ?? Colors.text;
   const pillTextColor = selected.textColor ?? (selected.color ? '#FFFFFF' : Colors.background);
   const iconName = icon ?? 'swap-vertical';

   const translateY = useSharedValue(0);

   const close = () => {
      translateY.value = 0;
      setOpen(false);
   };

   const panGesture = Gesture.Pan()
      .onUpdate((e) => {
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
            style={[
               styles.pill,
               { backgroundColor: pillBackground },
               type === 'icon' && {
                  paddingHorizontal: 0,
                  justifyContent: 'center',
                  aspectRatio: 1,
               },
            ]}
            onPress={() => setOpen(true)}
            accessibilityRole="button"
            accessibilityLabel={title}
         >
            {type === 'icon' ? (
               <Ionicons name={iconName} size={24} color={pillTextColor} />
            ) : (
               <>
                  <Text style={[styles.pillText, { color: pillTextColor }]}>{selected.label}</Text>
                  <Ionicons name="chevron-down" size={14} color={pillTextColor} />
               </>
            )}
         </Pressable>

         <Modal visible={open} transparent animationType="slide" onRequestClose={close}>
            <View style={styles.modalContainer}>
               <Pressable style={styles.backdrop} onPress={close} />
               <Animated.View
                  style={[styles.drawer, { backgroundColor: Colors.background }, animatedStyle]}
               >
                  <GestureDetector gesture={panGesture}>
                     <View style={styles.dragArea}>
                        <View style={styles.handle} />
                        {title && (
                           <Text style={[styles.title, { color: Colors.text }]}>{title}</Text>
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
                           style={[styles.option, { backgroundColor: option.color ?? Colors.text }]}
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
                                 {
                                    color:
                                       option.textColor ??
                                       (option.color ? '#FFFFFF' : Colors.background),
                                 },
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
