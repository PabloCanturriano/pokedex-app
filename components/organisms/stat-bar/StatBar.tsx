import { StyleSheet, View } from 'react-native';

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
};

export function StatBar({ stat, typeColor }: Props) {
   const fillPercent = Math.min(stat.value / STAT_MAX, 1);

   return (
      <View style={styles.row}>
         <Typography style={styles.label}>{STAT_LABELS[stat.name] ?? stat.name}</Typography>
         <Typography style={styles.value}>{stat.value}</Typography>
         <View style={[styles.track, { backgroundColor: '#F0F0F0' }]}>
            <View style={[styles.fill, { backgroundColor: typeColor, flex: fillPercent }]} />
            <View style={{ flex: 1 - fillPercent }} />
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
