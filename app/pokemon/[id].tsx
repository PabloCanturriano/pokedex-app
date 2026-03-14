import {Ionicons} from '@expo/vector-icons';
import {Image} from 'expo-image';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {ActivityIndicator, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {ThemedText} from '@/components/atoms/themed-text';
import {FavoriteButton} from '@/components/icons/FavoriteButton';
import {PokemonTypeBadge} from '@/components/icons/PokemonTypeBadge';
import {useThemeColor} from '@/hooks/use-theme-color';
import {usePokemonDetail} from '@/hooks/usePokemon';

const HEADER_HEIGHT = 300;
const SPRITE_SIZE = 200;

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  const cardBg = useThemeColor({ light: '#F5F5F5', dark: '#2A2A2A' }, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        {icon}
        <ThemedText style={styles.statLabel}>{label}</ThemedText>
      </View>
      <View style={[styles.statValueBox, { backgroundColor: cardBg }]}>
        <ThemedText style={[styles.statValue, { color: textColor }]}>{value}</ThemedText>
      </View>
    </View>
  );
}

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data: pokemon, isPending, isError } = usePokemonDetail(Number(id));

  const iconColor = useThemeColor({}, 'text');
  const bgColor = useThemeColor({}, 'background');


  if (isPending) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: bgColor }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !pokemon) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: bgColor }]}>
        <Pressable onPress={() => router.back()} style={styles.errorBack}>
          <Ionicons name="chevron-back" size={28} color={iconColor} />
        </Pressable>
        <ThemedText>Failed to load Pokémon data.</ThemedText>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Colored header */}
      <View style={[styles.header, { backgroundColor: pokemon.typeColor }]}>
        {/* Actions row */}
        <View style={[styles.actions, { top: insets.top }]}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </Pressable>
          <FavoriteButton id={pokemon.id} name={pokemon.name} />
        </View>

        {/* White blob behind sprite */}
        <View style={styles.blob} />

        {/* Sprite */}
        {pokemon.spriteUrl && (
          <Image
            source={{ uri: pokemon.spriteUrl }}
            style={styles.sprite}
            contentFit="contain"
          />
        )}
      </View>

      <SafeAreaView style={styles.scrollView} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText style={styles.name}>{pokemon.displayName}</ThemedText>
        <ThemedText style={styles.number}>N°{pokemon.number}</ThemedText>

        <View style={styles.typesRow}>
          {pokemon?.types.map(({ type }) => (
            <PokemonTypeBadge key={type.name} typeName={type.name} width={100} />
          ))}
        </View>

        {pokemon?.flavorText ? (
          <ThemedText style={styles.flavorText}>{pokemon.flavorText}</ThemedText>
        ) : null}

        <View style={styles.statsGrid}>
          <StatCard
            icon={<Ionicons name="scale-outline" size={16} color={iconColor} />}
            label="WEIGHT"
            value={`${pokemon.weightKg} kg`}
          />
          <StatCard
            icon={<Ionicons name="resize-outline" size={16} color={iconColor} />}
            label="HEIGHT"
            value={`${pokemon.heightM} m`}
          />
          <StatCard
            icon={<Ionicons name="grid-outline" size={16} color={iconColor} />}
            label="CATEGORY"
            value={pokemon?.category ?? '—'}
          />
          <StatCard
            icon={<Ionicons name="flash-outline" size={16} color={iconColor} />}
            label="ABILITY"
            value={pokemon?.ability ?? '—'}
          />
        </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  actions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    zIndex: 10,
  },
  blob: {
    position: 'absolute',
    bottom: -60,
    width: 260,
    height: 220,
    backgroundColor: '#fff',
    borderRadius: 9999,
    opacity: 0.25,
  },
  sprite: {
    width: SPRITE_SIZE,
    height: SPRITE_SIZE,
    marginBottom: -20,
    zIndex: 5,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 28,
    gap: 12,
  },
  name: {
    paddingTop: 22,
    fontSize: 34,
    fontWeight: '700',
  },
  number: {
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.6,
  },
  typesRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  flavorText: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    opacity: 0.85,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  statCard: {
    width: '46%',
    gap: 6,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    opacity: 0.5,
  },
  statValueBox: {
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorBack: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
});
