import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { MagikarpEmptyState } from '@/components/atoms/magikarp-empty-state';
import { Typography } from '@/components/atoms/typography';
import { ItemCard } from '@/components/molecules/item-card';
import { useItemsList } from '@/hooks/useItemsList';

type Props = {
  pockets: string[];
  search: string;
  query: string;
};

export function ItemList({ pockets, search, query }: Props) {
  const { data, isPending, isError, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useItemsList(pockets, search);

  const items = data?.pages.flatMap((p) => p.results) ?? [];

  if (isPending) return <ActivityIndicator style={styles.loader} />;
  if (isError) return <Typography style={styles.message}>Failed to load items.</Typography>;
  if (items.length === 0 && query.trim()) {
    return (
      <View style={styles.empty}>
        <MagikarpEmptyState />
        <Typography style={styles.message}>No items found for &quot;{query}&quot;</Typography>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
      }}
      onEndReachedThreshold={0.4}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator style={styles.footer} /> : null}
      renderItem={({ item }) => <ItemCard item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  message: {
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
    paddingVertical: 2,
  },
});
