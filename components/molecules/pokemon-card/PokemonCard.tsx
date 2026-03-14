import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/atoms/typography';
import { FavoriteButton } from '@/components/atoms/favorite-button';
import { PokemonCardBackground } from '@/components/molecules/pokemon-card-background';
import { PokemonTypeBadge } from '@/components/molecules/pokemon-type-badge';
import { usePokemon } from '@/hooks/usePokemon';

const RIGHT_PANEL_WIDTH = 140;
const SPRITE_SIZE = 101;

type Props = {
   id: number;
   name: string;
};

export function PokemonCard({ id, name }: Props) {
   const { data: pokemon } = usePokemon(id);

   return (
      <View style={[styles.card, { backgroundColor: pokemon?.cardBackground ?? '#A0A29F40' }]}>
         <View style={styles.left}>
            <Typography style={styles.number}>
               N°{pokemon?.number ?? String(id).padStart(3, '0')}
            </Typography>
            <Typography style={styles.name}>{pokemon?.displayName ?? name}</Typography>
            <View style={styles.typesRow}>
               {pokemon?.types.map(({ type }) => (
                  <PokemonTypeBadge key={type.name} typeName={type.name} />
               ))}
            </View>
         </View>

         <View style={styles.right}>
            <PokemonCardBackground typeName={pokemon?.primaryType ?? 'normal'} />
            {pokemon?.spriteUrl && (
               <Image
                  source={{ uri: pokemon.spriteUrl }}
                  style={styles.sprite}
                  contentFit="contain"
               />
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
      fontSize: 14,
      fontWeight: 'bold',
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
