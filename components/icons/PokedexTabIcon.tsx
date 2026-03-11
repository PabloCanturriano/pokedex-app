import { Asset } from 'expo-asset';
import { SvgUri } from 'react-native-svg';

type IconProps = {
  size?: number;
};

export function PokedexIcon({ size = 26 }: IconProps) {
  const uri = Asset.fromModule(require('@/assets/svg/tab-pokedex.svg')).uri;
  return <SvgUri uri={uri} width={size} height={size} />;
}

export function PokedexIconActive({ size = 26 }: IconProps) {
  const uri = Asset.fromModule(require('@/assets/svg/tab-pokedex-active.svg')).uri;
  return <SvgUri uri={uri} width={size} height={size} />;
}

export function PokedexTabIcon({ focused, size = 26 }: { focused: boolean; size?: number }) {
  return focused ? <PokedexIconActive size={size} /> : <PokedexIcon size={size} />;
}
