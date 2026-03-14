import { Asset } from 'expo-asset';
import { StyleSheet, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { Typography } from '@/components/atoms/typography';

type Props = {
   width?: number;
   height?: number;
   message?: string;
};

export function MagikarpEmptyState({ width = 185, height = 215, message }: Props) {
   const uri = Asset.fromModule(require('@/assets/svg/magikarp-empty-state.svg')).uri;

   if (!message) {
      return <SvgUri uri={uri} width={width} height={height} />;
   }

   return (
      <View style={styles.container}>
         <SvgUri uri={uri} width={width} height={height} />
         <Typography style={styles.message}>{message}</Typography>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
      gap: 16,
   },
   message: {
      textAlign: 'center',
      opacity: 0.5,
   },
});
