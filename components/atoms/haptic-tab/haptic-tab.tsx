import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';

import { type HapticTabProps } from '@/components/atoms/haptic-tab/types';

export function HapticTab(props: HapticTabProps) {
   return (
      <PlatformPressable
         {...props}
         onPressIn={(ev) => {
            if (process.env.EXPO_OS === 'ios') {
               Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            props.onPressIn?.(ev);
         }}
      />
   );
}
