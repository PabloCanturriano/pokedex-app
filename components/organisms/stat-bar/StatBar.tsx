import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { Typography } from '@/components/atoms/typography';
import { Colors } from '@/constants/theme';

const STAT_MAX = 255;
const STAT_LABELS: Record<string, string> = {
   hp: 'HP',
   attack: 'ATK',
   defense: 'DEF',
   'special-attack': 'SP.ATK',
   'special-defense': 'SP.DEF',
   speed: 'SPD',
};

type Props = {
   stat: { name: string; value: number };
   typeColor: string;
   index?: number;
};

export function StatBar({ stat, typeColor, index = 0 }: Props) {
   const fillPercent = Math.min(stat.value / STAT_MAX, 1);
   const animatedFill = useSharedValue(0);

   useEffect(() => {
      animatedFill.value = 0;
      animatedFill.value = withDelay(index * 80, withTiming(fillPercent, { duration: 700 }));
   }, [fillPercent, index, animatedFill]);

   const fillStyle = useAnimatedStyle(() => ({ flex: animatedFill.value }));
   const emptyStyle = useAnimatedStyle(() => ({ flex: Math.max(1 - animatedFill.value, 0) }));

   return (
      <View style={styles.row}>
         <Typography style={styles.label}>{STAT_LABELS[stat.name] ?? stat.name}</Typography>
         <Typography style={styles.value}>{stat.value}</Typography>
         <View style={[styles.track, { backgroundColor: '#F0F0F0' }]}>
            <Animated.View style={[styles.fill, { backgroundColor: typeColor }, fillStyle]} />
            <Animated.View style={emptyStyle} />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
   },
   label: {
      width: 60,
      fontSize: 12,
      fontWeight: '600',
      opacity: 0.5,
   },
   value: {
      width: 32,
      fontSize: 13,
      fontWeight: '700',
      textAlign: 'right',
      color: Colors.text,
   },
   track: {
      flex: 1,
      height: 6,
      borderRadius: 99,
      flexDirection: 'row',
      overflow: 'hidden',
   },
   fill: {
      borderRadius: 99,
   },
});
