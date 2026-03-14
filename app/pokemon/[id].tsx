import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Typography } from '@/components/atoms/typography';
import { FavoriteButton } from '@/components/atoms/favorite-button';
import { PokemonTypeBadge } from '@/components/molecules/pokemon-type-badge';
import { EvolutionChain } from '@/components/organisms/evolution-chain';
import { StatBar } from '@/components/organisms/stat-bar';
import { StatCard } from '@/components/organisms/stat-card';
import { Colors } from '@/constants/theme';
import { usePokemonDetail } from '@/hooks/usePokemon';

const HEADER_HEIGHT = 300;
const SPRITE_SIZE = 200;

export default function PokemonDetailScreen() {
   const { id } = useLocalSearchParams<{ id: string }>();
   const numericId = Number(id);
   const router = useRouter();
   const insets = useSafeAreaInsets();
   const { t } = useTranslation();
   const { data: pokemon, isPending, isError } = usePokemonDetail(numericId);
   const [isShiny, setIsShiny] = useState(false);

   if (isPending) {
      return (
         <View style={[styles.loadingContainer, { backgroundColor: Colors.background }]}>
            <ActivityIndicator size="large" />
         </View>
      );
   }

   if (isError || !pokemon) {
      return (
         <View style={[styles.loadingContainer, { backgroundColor: Colors.background }]}>
            <Pressable onPress={() => router.back()} style={styles.errorBack}>
               <Ionicons name="chevron-back" size={28} color={Colors.text} />
            </Pressable>
            <Typography>{t('pokedex.failedToLoad')}</Typography>
         </View>
      );
   }

   return (
      <View style={[styles.container, { backgroundColor: Colors.background }]}>
         <View style={[styles.header, { backgroundColor: pokemon.typeColor }]}>
            <View style={[styles.actions, { top: insets.top }]}>
               <Pressable
                  onPress={() => router.back()}
                  hitSlop={12}
                  accessibilityLabel={t('common.goBack')}
                  accessibilityRole="button"
               >
                  <Ionicons name="chevron-back" size={28} color="#fff" />
               </Pressable>
               <View style={styles.actionsRight}>
                  {pokemon.shinyUrl && (
                     <Pressable
                        onPress={() => setIsShiny((v) => !v)}
                        hitSlop={12}
                        accessibilityLabel={isShiny ? t('pokedex.showNormal') : t('pokedex.showShiny')}
                        accessibilityRole="button"
                     >
                        <Ionicons
                           name={isShiny ? 'sparkles' : 'sparkles-outline'}
                           size={24}
                           color="#fff"
                        />
                     </Pressable>
                  )}
                  <FavoriteButton id={pokemon.id} name={pokemon.name} />
               </View>
            </View>

            <View style={styles.blob} />

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
                     accessibilityLabel={t('pokedex.previousPokemon')}
                  >
                     <Ionicons
                        name="chevron-back-circle-outline"
                        size={28}
                        color={numericId <= 1 ? '#ccc' : Colors.text}
                     />
                  </Pressable>
                  <Typography style={styles.name}>{pokemon.displayName}</Typography>
                  <Pressable
                     onPress={() =>
                        router.replace({
                           pathname: '/pokemon/[id]',
                           params: { id: numericId + 1, direction: 'next' },
                        })
                     }
                     disabled={numericId >= 1025}
                     hitSlop={12}
                     accessibilityLabel={t('pokedex.nextPokemon')}
                  >
                     <Ionicons
                        name="chevron-forward-circle-outline"
                        size={28}
                        color={numericId >= 1025 ? '#ccc' : Colors.text}
                     />
                  </Pressable>
               </View>

               <Typography style={styles.number}>N°{pokemon.number}</Typography>

               <View style={styles.typesRow}>
                  {pokemon.types.map(({ type }) => (
                     <PokemonTypeBadge key={type.name} typeName={type.name} width={100} />
                  ))}
               </View>

               {pokemon.flavorText ? (
                  <Typography style={styles.flavorText}>{pokemon.flavorText}</Typography>
               ) : null}

               <View style={styles.statsGrid}>
                  <StatCard
                     icon={<Ionicons name="scale-outline" size={16} color={Colors.text} />}
                     label={t('pokedex.weight')}
                     value={t('pokedex.weightUnit', { value: pokemon.weightKg })}
                  />
                  <StatCard
                     icon={<Ionicons name="resize-outline" size={16} color={Colors.text} />}
                     label={t('pokedex.height')}
                     value={t('pokedex.heightUnit', { value: pokemon.heightM })}
                  />
                  <StatCard
                     icon={<Ionicons name="grid-outline" size={16} color={Colors.text} />}
                     label={t('pokedex.category')}
                     value={pokemon.category ?? '—'}
                  />
                  <StatCard
                     icon={<Ionicons name="flash-outline" size={16} color={Colors.text} />}
                     label={t('pokedex.ability')}
                     value={pokemon.ability ?? '—'}
                  />
               </View>

               <Typography style={styles.sectionTitle}>{t('pokedex.baseStats')}</Typography>
               <View style={styles.statsList}>
                  {pokemon.stats.map((stat, i) => (
                     <StatBar key={stat.name} stat={stat} typeColor={pokemon.typeColor} index={i} />
                  ))}
               </View>

               {pokemon.evolutionChain.length > 1 ? (
                  <>
                     <Typography style={styles.sectionTitle}>{t('pokedex.evolution')}</Typography>
                     <EvolutionChain
                        evolutionChain={pokemon.evolutionChain}
                        currentId={numericId}
                        typeColor={pokemon.typeColor}
                     />
                  </>
               ) : null}
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
   actionsRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
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
   sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      marginTop: 8,
   },
   statsList: {
      gap: 10,
      marginTop: 4,
   },
   statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginTop: 8,
   },
   errorBack: {
      position: 'absolute',
      top: 60,
      left: 20,
   },
});
