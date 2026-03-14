import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Typography } from '@/components/atoms/typography';
import { ItemCard } from '@/components/molecules/item-card';
import { useItemsList } from '@/hooks/useItemsList';

export default function ItemsScreen() {
  const { data, isPending, isError, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useItemsList();

  const items = data?.pages.flatMap((p) => p.results) ?? [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: 'white' }]}>
      <Typography style={styles.title}>Items</Typography>

      {isPending ? (
        <ActivityIndicator style={styles.loader} />
      ) : isError ? (
        <Typography style={styles.error}>Failed to load items.</Typography>
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
    </SafeAreaView>
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
    paddingTop: 12,
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
    paddingBottom: 0,
  },
  separator: {
    height: 8,
  },
  footer: {
    paddingVertical: 2,
  },
});
