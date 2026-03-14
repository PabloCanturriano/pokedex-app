import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AsyncView } from '@/components/atoms/async-view';
import { Typography } from '@/components/atoms/typography';
import { StatCard } from '@/components/organisms/stat-card';
import { Colors } from '@/constants/theme';
import { useItemDetail } from '@/hooks/useItemDetail';

const HEADER_HEIGHT = 260;
const SPRITE_SIZE = 160;

export default function ItemDetailScreen() {
   const { id, color } = useLocalSearchParams<{ id: string; color: string }>();
   const router = useRouter();
   const insets = useSafeAreaInsets();
   const { data: item, isPending, isError } = useItemDetail(Number(id));
   const safeItem = item!;

   const headerColor = color ?? Colors.tint;

   return (
      <AsyncView
         isPending={isPending}
         isError={isError || !item}
         errorFallback={
            <View style={[styles.loadingContainer, { backgroundColor: Colors.background }]}>
               <Pressable onPress={() => router.back()} style={styles.errorBack}>
                  <Ionicons name="chevron-back" size={28} color={Colors.text} />
               </Pressable>
               <Typography>Failed to load item data.</Typography>
            </View>
         }
      >
         <View style={[styles.container, { backgroundColor: Colors.background }]}>
            <View style={[styles.header, { backgroundColor: headerColor }]}>
               <View style={[styles.actions, { top: insets.top }]}>
                  <Pressable
                     onPress={() => router.back()}
                     hitSlop={12}
                     accessibilityLabel="Go back"
                     accessibilityRole="button"
                  >
                     <Ionicons name="chevron-back" size={28} color="#fff" />
                  </Pressable>
               </View>

               <View style={styles.blob} />

               <Image
                  source={{ uri: safeItem.spriteUrl }}
                  style={styles.sprite}
                  contentFit="contain"
               />
            </View>

            <SafeAreaView style={styles.scrollView} edges={['bottom']}>
               <ScrollView
                  style={styles.scrollView}
                  contentContainerStyle={styles.content}
                  showsVerticalScrollIndicator={false}
               >
                  <Typography style={styles.name}>{safeItem.displayName}</Typography>
                  <Typography style={styles.category}>
                     {safeItem.category.replace(/-/g, ' ')}
                  </Typography>

                  <View style={styles.statsGrid}>
                     <StatCard
                        icon={<Ionicons name="cart-outline" size={16} color={Colors.text} />}
                        label="BUY"
                        value={safeItem.cost > 0 ? `₽${safeItem.cost.toLocaleString()}` : '—'}
                     />
                     <StatCard
                        icon={<Ionicons name="cash-outline" size={16} color={Colors.text} />}
                        label="SELL"
                        value={
                           safeItem.sellPrice > 0 ? `₽${safeItem.sellPrice.toLocaleString()}` : '—'
                        }
                     />
                  </View>

                  {safeItem.flavorText ? (
                     <Typography style={styles.flavorText}>{safeItem.flavorText}</Typography>
                  ) : null}

                  {safeItem.shortEffect ? (
                     <>
                        <Typography style={styles.sectionTitle}>Effect</Typography>
                        <Typography style={styles.sectionBody}>{safeItem.shortEffect}</Typography>
                     </>
                  ) : null}

                  {safeItem.effect && safeItem.effect !== safeItem.shortEffect ? (
                     <>
                        <Typography style={styles.sectionTitle}>Details</Typography>
                        <Typography style={styles.sectionBody}>{safeItem.effect}</Typography>
                     </>
                  ) : null}
               </ScrollView>
            </SafeAreaView>
         </View>
      </AsyncView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   header: {
      height: HEADER_HEIGHT,
      alignItems: 'center',
      justifyContent: 'flex-end',
      overflow: 'hidden',
   },
   actions: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingTop: 12,
      zIndex: 10,
   },
   blob: {
      position: 'absolute',
      bottom: -60,
      width: 260,
      height: 220,
      backgroundColor: '#fff',
      borderRadius: 9999,
      opacity: 0.25,
   },
   sprite: {
      width: SPRITE_SIZE,
      height: SPRITE_SIZE,
      zIndex: 5,
   },
   scrollView: {
      flex: 1,
   },
   content: {
      paddingHorizontal: 20,
      paddingTop: 20,
      gap: 12,
   },
   name: {
      paddingTop: 12,
      fontSize: 34,
      fontWeight: '700',
   },
   category: {
      fontSize: 15,
      opacity: 0.5,
      textTransform: 'capitalize',
   },
   statsGrid: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 4,
   },
   flavorText: {
      fontSize: 15,
      lineHeight: 22,
      marginTop: 8,
      opacity: 0.85,
   },
   sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      marginTop: 8,
   },
   sectionBody: {
      fontSize: 15,
      lineHeight: 22,
   },
   errorBack: {
      position: 'absolute',
      top: 60,
      left: 20,
   },
});
