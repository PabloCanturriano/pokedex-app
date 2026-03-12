import { SafeAreaView } from 'react-native-safe-area-context';

import { type ThemedSafeAreaViewProps } from '@/components/atoms/themed-safe-area-view/types';
import { useThemeColor } from '@/hooks/use-theme-color';

export function ThemedSafeAreaView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedSafeAreaViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
}
