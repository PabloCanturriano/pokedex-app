import {type SafeAreaViewProps} from 'react-native-safe-area-context';

export type ThemedSafeAreaViewProps = SafeAreaViewProps & {
  lightColor?: string;
  darkColor?: string;
};
