import { Asset } from 'expo-asset';
import { Pressable, type ViewStyle } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { useFavoritesStore } from '@/store/useFavoritesStore';

const SIZE = 32;
const checkedUri = Asset.fromModule(require('@/assets/svg/fav-checked.svg')).uri;
const uncheckedUri = Asset.fromModule(require('@/assets/svg/fav_unchecked.svg')).uri;

type Props = {
  id: number;
  name: string;
  style?: ViewStyle;
};

export function FavoriteButton({ id, name, style }: Props) {
  const toggle = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(id));

  return (
    <Pressable
      onPress={() => toggle({ id, name })}
      style={style}
      hitSlop={8}
      accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      accessibilityRole="button"
    >
      <SvgUri uri={isFavorite ? checkedUri : uncheckedUri} width={SIZE} height={SIZE} />
    </Pressable>
  );
}
