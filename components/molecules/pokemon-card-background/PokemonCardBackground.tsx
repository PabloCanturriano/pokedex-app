import { Asset } from 'expo-asset';
import { StyleSheet, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

const BG_URIS: Record<string, string> = {
   bug: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/bug-bg.svg')).uri,
   dark: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/dark-bg.svg')).uri,
   dragon: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/drago-bg.svg')).uri,
   electric: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/elec-bg.svg')).uri,
   fairy: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/fairy-bg.svg')).uri,
   fighting: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/fight-bg.svg')).uri,
   fire: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/fire-bg.svg')).uri,
   flying: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/flying-bg.svg')).uri,
   ghost: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/ghost-bg.svg')).uri,
   grass: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/grass-bg.svg')).uri,
   ground: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/ground-bg.svg')).uri,
   ice: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/ice-bg.svg')).uri,
   normal: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/normal-bg.svg')).uri,
   poison: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/poison-bg.svg')).uri,
   psychic: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/psy-bg.svg')).uri,
   rock: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/rock-bg.svg')).uri,
   steel: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/steel-bg.svg')).uri,
   water: Asset.fromModule(require('@/assets/svg/pokemon-card-bg/water-bg.svg')).uri,
};

export function PokemonCardBackground({ typeName }: { typeName: string }) {
   const uri = BG_URIS[typeName];
   if (!uri) return null;
   return (
      <View style={StyleSheet.absoluteFill}>
         <SvgUri uri={uri} width="100%" height="100%" />
      </View>
   );
}
