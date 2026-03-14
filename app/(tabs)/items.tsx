import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { ThemedSafeAreaView } from '@/components/atoms/themed-safe-area-view';
import { ThemedText } from '@/components/atoms/themed-text';
import { ItemCard } from '@/components/molecules/item-card';
import { useItemsList } from '@/hooks/useItemsList';

export default function ItemsScreen() {
  const { data, isPending, isError, isFetchingNextPage, hasNextPage, fetchNextPage } = useItemsList();

  const items = data?.pages.flatMap((p) => p.results) ?? [];

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText style={styles.title}>Items</ThemedText>

      {isPending ? (
        <ActivityIndicator style={styles.loader} />
      ) : isError ? (
        <ThemedText style={styles.error}>Failed to load items.</ThemedText>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator style={styles.footer} /> : null
          }
          renderItem={({ item }) => <ItemCard item={item} />}
        />
      )}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  loader: {
    flex: 1,
  },
  error: {
    textAlign: 'center',
    opacity: 0.5,
    marginTop: 40,
  },
  list: {
    paddingBottom: 24,
  },
  separator: {
    height: 8,
  },
  footer: {
    paddingVertical: 16,
  },
});