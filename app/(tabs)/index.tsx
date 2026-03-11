import {ThemedText} from '@/components/atoms/themed-text';
import {ThemedSafeAreaView} from '@/components/atoms/themed-safe-area-view';
import {StyleSheet} from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText>Pokedex</ThemedText>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
