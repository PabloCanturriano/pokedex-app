import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { Typography } from '@/components/atoms/typography';
import { Colors } from '@/constants/theme';

type EvolutionEntry = {
   id: number;
   displayName: string;
   spriteUrl: string | null;
};

type Props = {
   evolutionChain: EvolutionEntry[];
   currentId: number;
   typeColor: string;
};

export function EvolutionChain({ evolutionChain, currentId, typeColor }: Props) {
   const router = useRouter();
   const { width: windowWidth } = useWindowDimensions();

   const evolutionColumns = Math.max(1, Math.min(evolutionChain.length, 3));
   const stepWidth = (windowWidth - 40) / evolutionColumns;

   return (
      <ScrollView
         horizontal
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={styles.row}
      >
         {evolutionChain.map((evo, index) => (
            <View key={evo.id} style={[styles.step, { width: stepWidth }]}>
               <View style={styles.node}>
                  <Pressable
                     onPress={() => {
                        if (evo.id === currentId) return;
                        const direction = evo.id < currentId ? 'prev' : 'next';
                        router.replace({
                           pathname: '/pokemon/[id]',
                           params: { id: evo.id, direction },
                        });
                     }}
                     disabled={evo.id === currentId}
                     accessibilityRole="button"
                     accessibilityLabel={`Go to ${evo.displayName}`}
                  >
                     <View
                        style={[
                           styles.spriteBox,
                           evo.id === currentId && { borderColor: typeColor, borderWidth: 2 },
                        ]}
                     >
                        {evo.spriteUrl ? (
                           <Image
                              source={{ uri: evo.spriteUrl }}
                              style={styles.sprite}
                              contentFit="contain"
                           />
                        ) : (
                           <View style={styles.sprite} />
                        )}
                     </View>
                  </Pressable>
                  <Typography style={styles.name}>{evo.displayName}</Typography>
               </View>
               {index < evolutionChain.length - 1 ? (
                  <Ionicons name="chevron-forward" size={18} color={Colors.text} />
               ) : null}
            </View>
         ))}
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
   },
   step: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   node: {
      flex: 1,
      alignItems: 'center',
   },
   spriteBox: {
      width: 56,
      height: 56,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderColor: 'rgba(0, 0, 0, 0.06)',
      borderWidth: 1,
   },
   sprite: {
      width: 46,
      height: 46,
   },
   name: {
      marginTop: 6,
      fontSize: 12,
      fontWeight: '600',
      textAlign: 'center',
      opacity: 0.85,
   },
});
