import {View} from 'react-native';

import {type ThemedViewProps} from '@/components/atoms/themed-view/types';
import {useThemeColor} from '@/hooks/use-theme-color';

export function ThemedView({style, lightColor, darkColor, ...otherProps}: ThemedViewProps) {
  const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background');

  return <View style={[{backgroundColor}, style]} {...otherProps} />;
}
