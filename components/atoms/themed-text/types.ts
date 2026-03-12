import { type TextProps } from 'react-native';

export type ThemedTextType = 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemedTextType;
};
