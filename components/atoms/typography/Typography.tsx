import { Text, type TextProps } from 'react-native';

import { Colors } from '@/constants/theme';

import { styles } from './styles';

export type TypographyType = 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';

export type TypographyProps = TextProps & {
   type?: TypographyType;
};

export function Typography({ style, type = 'default', ...rest }: TypographyProps) {
   return (
      <Text
         style={[
            { color: Colors.text },
            type === 'default' ? styles.default : undefined,
            type === 'title' ? styles.title : undefined,
            type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
            type === 'subtitle' ? styles.subtitle : undefined,
            type === 'link' ? styles.link : undefined,
            style,
         ]}
         {...rest}
      />
   );
}
