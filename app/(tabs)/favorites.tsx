import { ThemedSafeAreaView } from '@/components/atoms/themed-safe-area-view';
import { ThemedText } from '@/components/atoms/themed-text';
import { MagikarpEmptyState } from '@/components/icons/MagikarpEmptyState';
import { StyleSheet, View } from 'react-native';

export default function FavoritesScreen() {
  return (
    <ThemedSafeAreaView style={styles.container}>
      <MagikarpEmptyState />
      <View style={styles.textContainer}>
        <ThemedText type="subtitle" style={styles.title}>
          You don&apos;t have your favorite Pokémon :(
        </ThemedText>
        <ThemedText style={styles.description}>
          Click the heart icon on your favorite Pokémon and they will appear here.
        </ThemedText>
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 24,
  },
  textContainer: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
});
