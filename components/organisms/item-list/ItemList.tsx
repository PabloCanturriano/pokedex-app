import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';

import { AsyncView } from '@/components/atoms/async-view';
import { MagikarpEmptyState } from '@/components/atoms/magikarp-empty-state';
import { ItemCard } from '@/components/molecules/item-card';
import { useItemsList } from '@/hooks/useItemsList';

type Props = {
  pockets: string[];
  search: string;
  query: string;
  color: string;
};

export function ItemList({ pockets, search, query, color }: Props) {
  const router = useRouter();
  const { data, isPending, isError, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useItemsList(pockets, search);

  const items = data?.pages.flatMap((p) => p.results) ?? [];
  const isEmpty = items.length === 0 && !!query.trim();

  return (
    <AsyncView
      isPending={isPending}
      isError={isError}
      isEmpty={isEmpty}
      emptyFallback={<MagikarpEmptyState message={`No items found for "${query}"`} />}
    >
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
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({ pathname: '/items/[id]', params: { id: item.id, color } })
            }
          >
            <ItemCard item={item} />
          </Pressable>
        )}
      />
    </AsyncView>
  );
}

const styles = StyleSheet.create({
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
