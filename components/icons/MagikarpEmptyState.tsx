import {Asset} from 'expo-asset';
import {SvgUri} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
};

export function MagikarpEmptyState({ width = 185, height = 215 }: Props) {
  const uri = Asset.fromModule(require('@/assets/svg/magikarp-empty-state.svg')).uri;

  return <SvgUri uri={uri} width={width} height={height} />;
}
