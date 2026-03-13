import {Image} from 'expo-image';
import {StyleSheet, View} from 'react-native';

import {ThemedText} from '@/components/atoms/themed-text';
import {FavoriteButton} from '@/components/icons/FavoriteButton';
import {PokemonCardBackground} from '@/components/icons/PokemonCardBackground';
import {PokemonTypeBadge} from '@/components/icons/PokemonTypeBadge';
import {POKEMON_TYPE_COLORS} from '@/constants/pokemon';
import {usePokemon} from '@/hooks/usePokemon';

const RIGHT_PANEL_WIDTH = 140;
const SPRITE_SIZE = 101;

type Props = {
  id: number;
  name: string;
};

export function PokemonCard({ id, name }: Props) {
  const { data: pokemon } = usePokemon(id);

  const primaryType = pokemon?.types[0]?.type.name ?? 'normal';
  const typeColor = POKEMON_TYPE_COLORS[primaryType]?.bg ?? '#A0A29F';
  // 25% opacity tint of the type color as card background
  const cardBackground = `${typeColor}40`;
  const number = String(id).padStart(3, '0');
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  const spriteUrl = pokemon?.sprites.front_default;

  return (
    <View style={[styles.card, { backgroundColor: cardBackground }]}>
      <View style={styles.left}>
        <ThemedText style={[styles.number]}>N°{number}</ThemedText>
        <ThemedText style={styles.name}>{displayName}</ThemedText>
        <View style={styles.typesRow}>
          {pokemon?.types.map(({ type }) => (
            <PokemonTypeBadge key={type.name} typeName={type.name} />
          ))}
        </View>
      </View>

      <View style={[styles.right]}>
        <PokemonCardBackground typeName={primaryType} />
        {spriteUrl && (
          <Image source={{ uri: spriteUrl }} style={styles.sprite} contentFit="contain" />
        )}
      </View>
      <FavoriteButton id={id} name={name} style={styles.favBtn} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    minHeight: 100,
  },
  left: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 4,
    justifyContent: 'center',
  },
  number: {
    fontSize: 14, fontWeight: 'bold'
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  typesRow: {
    flexDirection: 'row',
    gap: 6,
  },
  right: {
    width: RIGHT_PANEL_WIDTH,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sprite: {
    width: SPRITE_SIZE,
    height: SPRITE_SIZE,
  },
  favBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
