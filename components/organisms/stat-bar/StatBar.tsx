import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/atoms/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

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
  const trackColor = useThemeColor({ light: '#F0F0F0', dark: '#2A2A2A' }, 'background');
  const textColor = useThemeColor({}, 'text');
  const fillPercent = Math.min(stat.value / STAT_MAX, 1);

  return (
    <View style={styles.row}>
      <ThemedText style={styles.label}>{STAT_LABELS[stat.name] ?? stat.name}</ThemedText>
      <ThemedText style={[styles.value, { color: textColor }]}>{stat.value}</ThemedText>
      <View style={[styles.track, { backgroundColor: trackColor }]}>
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