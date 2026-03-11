import { useState } from 'react';

import { TextBox } from '@/components/atoms/textbox';
import { ThemedSafeAreaView } from '@/components/atoms/themed-safe-area-view';
import { ThemedText } from '@/components/atoms/themed-text';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [query, setQuery] = useState('');

  return (
    <ThemedSafeAreaView style={styles.container}>
      <TextBox
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search Pokémon"
        returnKeyType="search"
        value={query}
        onChangeText={setQuery}
      />
      <ThemedText>Pokedex</ThemedText>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
      paddingVertical: 16,
    gap: 16,
  },
});
