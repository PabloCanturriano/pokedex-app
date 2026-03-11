import { ThemedSafeAreaView } from '@/components/atoms/themed-safe-area-view';
import { ThemedText } from '@/components/atoms/themed-text';
import { StyleSheet } from 'react-native';

export default function RegionsScreen() {
  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText>Regions</ThemedText>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
