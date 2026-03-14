import { Asset } from 'expo-asset';

import { SvgTabIcon } from './SvgTabIcon';

const inactiveUri = Asset.fromModule(require('@/assets/svg/tabs/tab-pokedex.svg')).uri;
const activeUri = Asset.fromModule(require('@/assets/svg/tabs/tab-pokedex-active.svg')).uri;

export function PokedexTabIcon({ focused, size = 26 }: { focused: boolean; size?: number }) {
   return (
      <SvgTabIcon focused={focused} size={size} inactiveUri={inactiveUri} activeUri={activeUri} />
   );
}
