import {FlatList, StyleSheet, View} from 'react-native';

import {PokemonCard} from '@/components/atoms/pokemon-card';
import {ThemedSafeAreaView} from '@/components/atoms/themed-safe-area-view';
import {ThemedText} from '@/components/atoms/themed-text';
import {MagikarpEmptyState} from '@/components/icons/MagikarpEmptyState';
import {useFavoritesStore} from '@/store/useFavoritesStore';

export default function FavoritesScreen() {
  const items = useFavoritesStore((s) => s.items);

  if (items.length === 0) {
    return (
      <ThemedSafeAreaView style={styles.empty}>
        <MagikarpEmptyState />
        <View style={styles.textContainer}>
          <ThemedText type="subtitle" style={styles.centered}>
            You don&apos;t have your favorite Pokémon :(
          </ThemedText>
          <ThemedText style={styles.centered}>
            Click the heart icon on your favorite Pokémon and they will appear here.
          </ThemedText>
        </View>
      </ThemedSafeAreaView>
    );
  }

  return (
    <ThemedSafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <PokemonCard id={item.id} name={item.name} />}
      />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 24,
  },
  textContainer: {
    alignItems: 'center',
    gap: 8,
  },
  centered: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  list: {
    paddingBottom: 24,
  },
  separator: {
    height: 12,
  },
});
