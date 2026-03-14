import { Asset } from 'expo-asset';
import { type StyleProp, TextInput, type TextInputProps, type TextStyle, View, type ViewStyle } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { Colors } from '@/constants/theme';

import { styles } from './styles';

const iconUri = Asset.fromModule(require('@/assets/svg/search.svg')).uri;

type Props = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export function TextBox({ containerStyle, inputStyle, ...rest }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: '#F2F2F2' }, containerStyle]}>
      <SvgUri uri={iconUri} width={20} height={20} style={styles.icon} />
      <TextInput
        placeholderTextColor={Colors.icon}
        style={[styles.input, { color: Colors.text }, inputStyle]}
        {...rest}
      />
    </View>
  );
}
