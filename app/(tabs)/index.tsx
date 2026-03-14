import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';

import { useRouter } from 'expo-router';

import { Asset } from 'expo-asset';
import { SvgUri } from 'react-native-svg';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Typography } from '@/components/atoms/typography';
import { MagikarpEmptyState } from '@/components/atoms/magikarp-empty-state';
import { TextBox } from '@/components/atoms/textbox';
import { DrawerSelect } from '@/components/molecules/drawer-select';
import { PokemonCard } from '@/components/molecules/pokemon-card';
import { REGION_OPTIONS, SORT_OPTIONS } from '@/constants/pokemon';
import { Colors } from '@/constants/theme';
import { usePokedex } from '@/hooks/usePokedex';

const favCheckedUri = Asset.fromModule(require('@/assets/svg/fav-checked.svg')).uri;
const favUncheckedUri = Asset.fromModule(require('@/assets/svg/fav_unchecked.svg')).uri;

export default function HomeScreen() {
  const router = useRouter();
  const {
    query, setQuery,
    typeFilter, setTypeFilter,
    regionFilter, setRegionFilter,
    sortBy, setSortBy,
    showFavorites, setShowFavorites,
    pokemons,
    typeOptions,
    isLoading,
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
            style={[styles.heartPill, { backgroundColor: showFavorites ? '#FD525C' : Colors.text }]}
            onPress={() => setShowFavorites((prev) => !prev)}
            accessibilityLabel={showFavorites ? 'Show all Pokémon' : 'Show favorites'}
            accessibilityRole="button"
          >
            <SvgUri uri={showFavorites ? favCheckedUri : favUncheckedUri} width={24} height={24} />
          </Pressable>
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.loader} />
      ) : showSearchEmpty ? (
        <View style={styles.emptyState}>
          <MagikarpEmptyState />
          <View style={styles.emptyTextContainer}>
            <Typography type="defaultSemiBold" style={styles.emptyText}>
              No Pokémon found for &quot;{debouncedQuery}&quot;
            </Typography>
            <Typography style={styles.emptyText}>Try a partial name, e.g. &quot;char&quot;</Typography>
          </View>
        </View>
      ) : showEmpty ? (
        <View style={styles.emptyState}>
          <MagikarpEmptyState />
          {isFavoritesMode && totalFavorites === 0 ? (
            <View style={styles.emptyTextContainer}>
              <Typography type="subtitle" style={styles.emptyText}>
                You don&apos;t have your favorite Pokémon :(
              </Typography>
              <Typography style={styles.emptyText}>
                Click the heart icon on your favorite Pokémon and they will appear here.
              </Typography>
            </View>
          ) : (
            <Typography type="defaultSemiBold" style={styles.emptyText}>
              {isFavoritesMode ? 'No favorites match your current filters' : 'No Pokémon found'}
            </Typography>
          )}
        </View>
      ) : (
        <FlatList
          data={pokemons}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={() => {
            if (!isSearching && !isFavoritesMode && !isFiltered && hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator style={styles.footer} /> : null
          }
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push({ pathname: '/pokemon/[id]' as any, params: { id: item.id } })}>
              <PokemonCard id={item.id} name={item.name} />
            </Pressable>
          )}
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