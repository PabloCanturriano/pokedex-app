import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/atoms/themed-text';
import { FavoriteButton } from '@/components/icons/FavoriteButton';
import { PokemonTypeBadge } from '@/components/icons/PokemonTypeBadge';
import { useThemeColor } from '@/hooks/use-theme-color';
import { usePokemonDetail } from '@/hooks/usePokemon';

const HEADER_HEIGHT = 300;
const SPRITE_SIZE = 200;

const STAT_MAX = 255;
const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  speed: 'SPD',
};

function StatRow({
  stat,
  typeColor,
}: {
  stat: { name: string; value: number };
  typeColor: string;
}) {
  const trackColor = useThemeColor({ light: '#F0F0F0', dark: '#2A2A2A' }, 'background');
  const textColor = useThemeColor({}, 'text');
  const fillPercent = Math.min(stat.value / STAT_MAX, 1);

  return (
    <View style={styles.statRow}>
      <ThemedText style={styles.statRowLabel}>{STAT_LABELS[stat.name] ?? stat.name}</ThemedText>
      <ThemedText style={[styles.statRowValue, { color: textColor }]}>{stat.value}</ThemedText>
      <View style={[styles.statTrack, { backgroundColor: trackColor }]}>
        <View style={[styles.statFill, { backgroundColor: typeColor, flex: fillPercent }]} />
        <View style={{ flex: 1 - fillPercent }} />
      </View>
    </View>
  );
}

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
  const numericId = Number(id);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const { data: pokemon, isPending, isError } = usePokemonDetail(numericId);
  const [isShiny, setIsShiny] = useState(false);

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

  const evolutionColumns = Math.max(1, Math.min(pokemon.evolutionChain.length, 3));
  const evolutionStepWidth = (windowWidth - 40) / evolutionColumns;

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
          <View style={styles.actionsRight}>
            {pokemon.shinyUrl && (
              <Pressable
                onPress={() => setIsShiny((v) => !v)}
                hitSlop={12}
                accessibilityLabel={isShiny ? 'Show normal sprite' : 'Show shiny sprite'}
                accessibilityRole="button"
              >
                <Ionicons name={isShiny ? 'sparkles' : 'sparkles-outline'} size={24} color="#fff" />
              </Pressable>
            )}
            <FavoriteButton id={pokemon.id} name={pokemon.name} />
          </View>
        </View>

        {/* White blob behind sprite */}
        <View style={styles.blob} />

        {/* Sprite */}
        {(isShiny ? pokemon.shinyUrl : pokemon.spriteUrl) && (
          <Image
            source={{ uri: (isShiny ? pokemon.shinyUrl : pokemon.spriteUrl)! }}
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
          <View style={styles.nameRow}>
            <Pressable
              onPress={() =>
                router.replace({
                  pathname: '/pokemon/[id]',
                  params: { id: numericId - 1, direction: 'prev' },
                })
              }
              disabled={numericId <= 1}
              hitSlop={12}
              accessibilityLabel="Previous Pokémon"
            >
              <Ionicons
                name="chevron-back-circle-outline"
                size={28}
                color={numericId <= 1 ? '#ccc' : iconColor}
              />
            </Pressable>
            <ThemedText style={styles.name}>{pokemon.displayName}</ThemedText>
            <Pressable
              onPress={() =>
                router.replace({
                  pathname: '/pokemon/[id]',
                  params: { id: numericId + 1, direction: 'next' },
                })
              }
              disabled={numericId >= 1025}
              hitSlop={12}
              accessibilityLabel="Next Pokémon"
            >
              <Ionicons
                name="chevron-forward-circle-outline"
                size={28}
                color={numericId >= 1025 ? '#ccc' : iconColor}
              />
            </Pressable>
          </View>
          <ThemedText style={styles.number}>N°{pokemon.number}</ThemedText>

          <View style={styles.typesRow}>
            {pokemon?.types.map(({ type }) => (
              <PokemonTypeBadge key={type.name} typeName={type.name} width={100} />
            ))}
          </View>

          {pokemon?.flavorText ? (
            <ThemedText style={styles.flavorText}>{pokemon.flavorText}</ThemedText>
          ) : null}

          {pokemon.evolutionChain.length > 1 ? (
            <>
              <ThemedText style={styles.sectionTitle}>Evolution</ThemedText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.evolutionRow}
              >
                {pokemon.evolutionChain.map((evo, index) => (
                  <View key={evo.id} style={[styles.evolutionStep, { width: evolutionStepWidth }]}>
                    <View style={styles.evolutionNode}>
                      <Pressable
                        onPress={() => {
                          if (evo.id === numericId) return;
                          const direction = evo.id < numericId ? 'prev' : 'next';
                          router.replace({ pathname: '/pokemon/[id]', params: { id: evo.id, direction } });
                        }}
                        disabled={evo.id === numericId}
                        accessibilityRole="button"
                        accessibilityLabel={`Go to ${evo.displayName}`}
                      >
                        <View
                          style={[
                            styles.evolutionSpriteBox,
                            evo.id === numericId && { borderColor: pokemon.typeColor, borderWidth: 2 },
                          ]}
                        >
                          {evo.spriteUrl ? (
                            <Image
                              source={{ uri: evo.spriteUrl }}
                              style={styles.evolutionSprite}
                              contentFit="contain"
                            />
                          ) : (
                            <View style={styles.evolutionSprite} />
                          )}
                        </View>
                      </Pressable>
                      <ThemedText style={styles.evolutionName}>{evo.displayName}</ThemedText>
                    </View>
                    {index < pokemon.evolutionChain.length - 1 ? (
                      <Ionicons name="chevron-forward" size={18} color={iconColor} />
                    ) : null}
                  </View>
                ))}
              </ScrollView>
            </>
          ) : null}

          <ThemedText style={styles.sectionTitle}>Base Stats</ThemedText>
          <View style={styles.statsList}>
            {pokemon.stats.map((stat) => (
              <StatRow key={stat.name} stat={stat} typeColor={pokemon.typeColor} />
            ))}
          </View>

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
  evolutionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  evolutionStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  evolutionNode: {
    flex: 1,
    alignItems: 'center',
  },
  evolutionSpriteBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: 'rgba(0, 0, 0, 0.06)',
    borderWidth: 1,
  },
  evolutionSprite: {
    width: 46,
    height: 46,
  },
  evolutionName: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
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
  actionsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  name: {
    flex: 1,
    textAlign: 'center',
    fontSize: 34,
    fontWeight: '700',
    paddingTop: 22,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
  statsList: {
    gap: 10,
    marginTop: 4,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statRowLabel: {
    width: 60,
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.5,
  },
  statRowValue: {
    width: 32,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
  },
  statTrack: {
    flex: 1,
    height: 6,
    borderRadius: 99,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  statFill: {
    borderRadius: 99,
  },
});
