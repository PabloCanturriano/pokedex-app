import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/atoms/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type Props = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

export function StatCard({ icon, label, value }: Props) {
  const cardBg = useThemeColor({ light: '#F5F5F5', dark: '#2A2A2A' }, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {icon}
        <ThemedText style={styles.label}>{label}</ThemedText>
      </View>
      <View style={[styles.valueBox, { backgroundColor: cardBg }]}>
        <ThemedText style={[styles.value, { color: textColor }]}>{value}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '46%',
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    opacity: 0.5,
  },
  valueBox: {
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
});