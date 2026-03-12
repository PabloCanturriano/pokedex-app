import { Asset } from 'expo-asset';
import { TextInput, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { styles } from '@/components/atoms/textbox/styles';
import { type TextBoxProps } from '@/components/atoms/textbox/types';
import { useThemeColor } from '@/hooks/use-theme-color';

const iconUri = Asset.fromModule(require('@/assets/svg/search.svg')).uri;

export function TextBox({
  containerStyle,
  inputStyle,
  lightColor,
  darkColor,
  placeholderTextColor,
  ...rest
}: TextBoxProps) {
  const backgroundColor = useThemeColor(
    {
      light: lightColor ?? '#F2F2F2',
      dark: darkColor ?? '#1E1F21',
    },
    'background'
  );

  const textColor = useThemeColor({}, 'text');
  const defaultPlaceholderTextColor = useThemeColor({}, 'icon');

  return (
    <View style={[styles.container, { backgroundColor }, containerStyle]}>
      <SvgUri uri={iconUri} width={20} height={20} style={styles.icon} />
      <TextInput
        placeholderTextColor={placeholderTextColor ?? defaultPlaceholderTextColor}
        style={[styles.input, { color: textColor }, inputStyle]}
        {...rest}
      />
    </View>
  );
}
