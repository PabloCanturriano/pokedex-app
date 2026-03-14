import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { PokemonListItem } from '@/api/pokemon/types';
import { MagikarpEmptyState } from '@/components/atoms/magikarp-empty-state';
import { TextBox } from '@/components/atoms/textbox';
import { Typography } from '@/components/atoms/typography';
import { DrawerSelect } from '@/components/molecules/drawer-select';
import { PokemonCard } from '@/components/molecules/pokemon-card';
import { REGION_OPTIONS, SORT_OPTIONS } from '@/constants/pokemon';
import { Colors } from '@/constants/theme';
import { usePokedex } from '@/hooks/usePokedex';

function Separator() {
   return <View style={styles.separator} />;
}

export default function HomeScreen() {
   const router = useRouter();
   const {
      query,
      setQuery,
      typeFilter,
      setTypeFilter,
      regionFilter,
      setRegionFilter,
      sortBy,
      setSortBy,
      showFavorites,
      setShowFavorites,
      pokemons,
      typeOptions,
      isLoading,
      isError,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
      showSearchEmpty,
      showEmpty,
      debouncedQuery,
      totalFavorites,
      isFiltered,
      isFavoritesMode,
      isSearching,
   } = usePokedex();

   const renderItem = useCallback(
      ({ item }: { item: PokemonListItem }) => (
         <Pressable
            onPress={() => router.push({ pathname: '/pokemon/[id]', params: { id: item.id } })}
         >
            <PokemonCard id={item.id} name={item.name} />
         </Pressable>
      ),
      [router]
   );

   const onEndReached = useCallback(() => {
      if (!isSearching && !isFavoritesMode && !isFiltered && hasNextPage && !isFetchingNextPage) {
         fetchNextPage();
      }
   }, [isSearching, isFavoritesMode, isFiltered, hasNextPage, isFetchingNextPage, fetchNextPage]);

   const emptyFallback = showSearchEmpty ? (
      <>
         <MagikarpEmptyState />
         <View style={styles.emptyTextContainer}>
            <Typography type="defaultSemiBold" style={styles.emptyText}>
               No Pokémon found for &quot;{debouncedQuery}&quot;
            </Typography>
            <Typography style={styles.emptyText}>Try a partial name, e.g. &quot;char&quot;</Typography>
         </View>
      </>
   ) : isFavoritesMode && totalFavorites === 0 ? (
      <>
         <MagikarpEmptyState />
         <View style={styles.emptyTextContainer}>
            <Typography type="subtitle" style={styles.emptyText}>
               You don&apos;t have your favorite Pokémon :(
            </Typography>
            <Typography style={styles.emptyText}>
               Click the heart icon on your favorite Pokémon and they will appear here.
            </Typography>
         </View>
      </>
   ) : (
      <MagikarpEmptyState
         message={
            isFavoritesMode ? 'No favorites match your current filters' : 'No Pokémon found'
         }
      />
   );

   return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
         <TextBox
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Search Pokémon"
            placeholder="Search Pokémon"
            returnKeyType="search"
            value={query}
            onChangeText={setQuery}
         />
         <View style={styles.filterRow}>
            <View style={styles.filterItem}>
               <DrawerSelect
                  value={typeFilter}
                  options={typeOptions}
                  onChange={setTypeFilter}
                  title="Select type"
               />
            </View>
            <View style={styles.filterItem}>
               <DrawerSelect
                  value={regionFilter}
                  options={REGION_OPTIONS}
                  onChange={setRegionFilter}
                  title="Select region"
               />
            </View>
            <View style={styles.iconItem}>
               <DrawerSelect
                  value={sortBy}
                  options={SORT_OPTIONS}
                  onChange={setSortBy}
                  title="Sort by"
                  type="icon"
                  icon="swap-vertical"
               />
            </View>
            <View style={styles.iconItem}>
               <Pressable
                  style={[
                     styles.heartPill,
                     { backgroundColor: showFavorites ? '#FD525C' : Colors.text },
                  ]}
                  onPress={() => setShowFavorites((prev) => !prev)}
                  accessibilityLabel={showFavorites ? 'Show all Pokémon' : 'Show favorites'}
                  accessibilityRole="button"
               >
                  <Ionicons
                     name={showFavorites ? 'heart' : 'heart-outline'}
                     size={24}
                     color="#fff"
                  />
               </Pressable>
            </View>
         </View>

         {isLoading ? (
            <ActivityIndicator style={styles.loader} />
         ) : isError ? (
            <View style={styles.emptyState}>
               <MagikarpEmptyState message="Something went wrong. Please try again." />
            </View>
         ) : showEmpty || showSearchEmpty ? (
            <View style={styles.emptyState}>{emptyFallback}</View>
         ) : (
            <FlatList
               data={pokemons}
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
   filterRow: {
      flexDirection: 'row',
      gap: 8,
   },
   filterItem: {
      flex: 1,
   },
   iconItem: {
      width: 42,
      aspectRatio: 1,
   },
   heartPill: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 999,
   },
   loader: {
      flex: 1,
   },
   emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
   },
   emptyTextContainer: {
      alignItems: 'center',
      gap: 8,
   },
   emptyText: {
      textAlign: 'center',
   },
   list: {
      paddingBottom: 24,
   },
   separator: {
      height: 12,
   },
   footer: {
      paddingVertical: 16,
   },
});
