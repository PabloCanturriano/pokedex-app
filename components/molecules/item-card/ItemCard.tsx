import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/atoms/themed-text';
import { ThemedView } from '@/components/atoms/themed-view';
import type { Item } from '@/api/pokemon/types';

type Props = {
  item: Item;
};

export function ItemCard({ item }: Props) {
  return (
    <ThemedView style={styles.card} lightColor="#F5F5F5" darkColor="#1E1F21">
      <Image
        source={{ uri: item.spriteUrl }}
        style={styles.sprite}
        contentFit="contain"
      />
      <View style={styles.info}>
        <ThemedText style={styles.name}>{item.displayName}</ThemedText>
        <ThemedText style={styles.category}>{item.category}</ThemedText>
      </View>
      {item.cost > 0 && (
        <View style={styles.costBadge}>
          <ThemedText style={styles.cost}>₽{item.cost.toLocaleString()}</ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  sprite: {
    width: 48,
    height: 48,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  category: {
    fontSize: 12,
    opacity: 0.5,
    textTransform: 'capitalize',
  },
  costBadge: {
    backgroundColor: 'rgba(253, 82, 92, 0.12)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  cost: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FD525C',
  },
});