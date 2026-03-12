import { Asset } from 'expo-asset';

import { SvgTabIcon } from './SvgTabIcon';

const inactiveUri = Asset.fromModule(require('@/assets/svg/tab-regions.svg')).uri;
const activeUri = Asset.fromModule(require('@/assets/svg/tab-regions-active.svg')).uri;

export function RegionsTabIcon({ focused, size = 26 }: { focused: boolean; size?: number }) {
  return (
    <SvgTabIcon focused={focused} size={size} inactiveUri={inactiveUri} activeUri={activeUri} />
  );
}
