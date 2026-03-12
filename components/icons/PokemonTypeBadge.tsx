import {Asset} from 'expo-asset';
import {SvgUri} from 'react-native-svg';

const BADGE_URIS: Record<string, string> = {
  bug: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-bug.svg')).uri,
  dark: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-dark.svg')).uri,
  dragon: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-drago.svg')).uri,
  electric: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-electric.svg')).uri,
  fairy: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-fairy.svg')).uri,
  fighting: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-fight.svg')).uri,
  fire: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-fire.svg')).uri,
  flying: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-flying.svg')).uri,
  ghost: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-ghost.svg')).uri,
  grass: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-grass.svg')).uri,
  ground: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-ground.svg')).uri,
  ice: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-ice.svg')).uri,
  normal: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-normal.svg')).uri,
  poison: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-poison.svg')).uri,
  psychic: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-psy.svg')).uri,
  rock: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-rock.svg')).uri,
  steel: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-steel.svg')).uri,
  water: Asset.fromModule(require('@/assets/svg/pokemon-type-badge/type-water.svg')).uri,
};

// SVG natural dimensions: 59×27
const BADGE_ASPECT_RATIO = 27 / 59;

type Props = {
  typeName: string;
  width?: number;
};

export function PokemonTypeBadge({ typeName, width = 86 }: Props) {
  const uri = BADGE_URIS[typeName];
  if (!uri) return null;
  return <SvgUri uri={uri} width={width} height={Math.round(width * BADGE_ASPECT_RATIO)} />;
}

