import { Ionicons } from '@expo/vector-icons';
import {
   type StyleProp,
   TextInput,
   type TextInputProps,
   type TextStyle,
   View,
   type ViewStyle,
} from 'react-native';

import { Colors } from '@/constants/theme';

import { styles } from './styles';

type Props = TextInputProps & {
   containerStyle?: StyleProp<ViewStyle>;
   inputStyle?: StyleProp<TextStyle>;
};

export function TextBox({ containerStyle, inputStyle, ...rest }: Props) {
   return (
      <View style={[styles.container, { backgroundColor: '#F2F2F2' }, containerStyle]}>
         <Ionicons name="search-outline" size={20} color={Colors.icon} style={styles.icon} />
         <TextInput
            placeholderTextColor={Colors.icon}
            style={[styles.input, { color: Colors.text }, inputStyle]}
            {...rest}
         />
      </View>
   );
}
