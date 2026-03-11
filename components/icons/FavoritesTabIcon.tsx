import { Asset } from 'expo-asset';
import { SvgUri } from 'react-native-svg';

type IconProps = {
  size?: number;
};

export function FavoritesIcon({ size = 26 }: IconProps) {
  const uri = Asset.fromModule(require('@/assets/svg/tab-favorites.svg')).uri;
  return <SvgUri uri={uri} width={size} height={size} />;
}

export function FavoritesIconActive({ size = 26 }: IconProps) {
  const uri = Asset.fromModule(require('@/assets/svg/tab-favorites-active.svg')).uri;
  return <SvgUri uri={uri} width={size} height={size} />;
}

export function FavoritesTabIcon({ focused, size = 26 }: { focused: boolean; size?: number }) {
  return focused ? <FavoritesIconActive size={size} /> : <FavoritesIcon size={size} />;
}
