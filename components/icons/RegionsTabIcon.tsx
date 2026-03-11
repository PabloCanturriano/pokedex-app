import { Asset } from 'expo-asset';
import { SvgUri } from 'react-native-svg';

type IconProps = {
  size?: number;
};

export function RegionsIcon({ size = 26 }: IconProps) {
  const uri = Asset.fromModule(require('@/assets/svg/tab-regions.svg')).uri;
  return <SvgUri uri={uri} width={size} height={size} />;
}

export function RegionsIconActive({ size = 26 }: IconProps) {
  const uri = Asset.fromModule(require('@/assets/svg/tab-regions-active.svg')).uri;
  return <SvgUri uri={uri} width={size} height={size} />;
}

export function RegionsTabIcon({ focused, size = 26 }: { focused: boolean; size?: number }) {
  return focused ? <RegionsIconActive size={size} /> : <RegionsIcon size={size} />;
}
