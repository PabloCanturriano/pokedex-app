import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';

import type { Item } from '@/api/pokemon/types';
import { MagikarpEmptyState } from '@/components/atoms/magikarp-empty-state';
import { ItemCard } from '@/components/molecules/item-card';
import { useItemsList } from '@/hooks/useItemsList';

type Props = {
   pockets: string[];
   search: string;
   query: string;
   color: string;
};

function Separator() {
   return <View style={styles.separator} />;
}

export function ItemList({ pockets, search, query, color }: Props) {
   const router = useRouter();
   const { data, isPending, isError, isFetchingNextPage, hasNextPage, fetchNextPage } =
      useItemsList(pockets, search);

   const items = data?.pages.flatMap((p) => p.results) ?? [];
   const isEmpty = items.length === 0 && !!query.trim();

   const renderItem = useCallback(
      ({ item }: { item: Item }) => (
         <Pressable
            onPress={() => router.push({ pathname: '/items/[id]', params: { id: item.id, color } })}
         >
            <ItemCard item={item} />
         </Pressable>
      ),
      [router, color]
   );

   const onEndReached = useCallback(() => {
      if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

   if (isPending) {
      return <ActivityIndicator style={styles.centered} />;
   }

   if (isError) {
      return (
         <View style={styles.centered}>
            <MagikarpEmptyState message="Something went wrong. Please try again." />
         </View>
      );
   }

   if (isEmpty) {
      return (
         <View style={styles.centered}>
            <MagikarpEmptyState message={`No items found for "${query}"`} />
         </View>
      );
   }

   return (
      <FlatList
         data={items}
         keyExtractor={(item) => String(item.id)}
         contentContainerStyle={styles.list}
         ItemSeparatorComponent={Separator}
         onEndReached={onEndReached}
         onEndReachedThreshold={0.4}
         ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator style={styles.footer} /> : null
         }
         renderItem={renderItem}
      />
   );
}

const styles = StyleSheet.create({
   centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
