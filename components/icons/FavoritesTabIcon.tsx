`import {Asset} from 'expo-asset';

import {SvgTabIcon} from './SvgTabIcon';

const inactiveUri = Asset.fromModule(require('@/assets/svg/tabs/tab-favorites.svg')).uri;
const activeUri = Asset.fromModule(require('@/assets/svg/tabs/tab-favorites-active.svg')).uri;

export function FavoritesTabIcon({ focused, size = 26 }: { focused: boolean; size?: number }) {
  return (
    <SvgTabIcon focused={focused} size={size} inactiveUri={inactiveUri} activeUri={activeUri} />
  );
}
