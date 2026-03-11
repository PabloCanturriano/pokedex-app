import { type StyleProp, type TextInputProps, type TextStyle, type ViewStyle } from 'react-native';

export type TextBoxProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  lightColor?: string;
  darkColor?: string;
};
