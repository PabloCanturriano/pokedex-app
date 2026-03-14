import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/atoms/typography';

type Props = {
   isPending: boolean;
   isError: boolean;
   isEmpty?: boolean;
   loadingFallback?: React.ReactNode;
   errorFallback?: React.ReactNode;
   emptyFallback?: React.ReactNode;
   children: React.ReactNode;
};

export function AsyncView({
   isPending,
   isError,
   isEmpty,
   loadingFallback,
   errorFallback,
   emptyFallback,
   children,
}: Props) {
   if (isPending) {
      return (
         <View style={styles.state}>{loadingFallback ?? <ActivityIndicator size="large" />}</View>
      );
   }

   if (isError) {
      return (
         <View style={styles.state}>
            {errorFallback ?? <Typography style={styles.message}>Something went wrong.</Typography>}
         </View>
      );
   }

   if (isEmpty && emptyFallback) {
      return <View style={styles.state}>{emptyFallback}</View>;
   }

   return <>{children}</>;
}

const styles = StyleSheet.create({
   state: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
   },
   message: {
      opacity: 0.5,
      textAlign: 'center',
   },
});
