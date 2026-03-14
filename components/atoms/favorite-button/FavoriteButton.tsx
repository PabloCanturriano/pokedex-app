import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { useFavoritesStore } from '@/store/useFavoritesStore';

const SIZE = 32;
const ICON_SIZE = 18;

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
      style={[styles.button, style]}
      hitSlop={8}
      accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      accessibilityRole="button"
    >
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={ICON_SIZE}
        color={isFavorite ? '#FD525C' : '#FFFFFF'}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
});
