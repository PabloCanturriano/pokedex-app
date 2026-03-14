import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/atoms/typography';

type Props = {
   icon: React.ReactNode;
   label: string;
   value: string;
};

export function StatCard({ icon, label, value }: Props) {
   return (
      <View style={styles.card}>
         <View style={styles.header}>
            {icon}
            <Typography style={styles.label}>{label}</Typography>
         </View>
         <View style={styles.valueBox}>
            <Typography style={styles.value}>{value}</Typography>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   card: {
      width: '48%',
      gap: 6,
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
   },
   label: {
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: 0.8,
      opacity: 0.5,
   },
   valueBox: {
      backgroundColor: '#F5F5F5',
      borderRadius: 10,
      paddingVertical: 10,
      alignItems: 'center',
   },
   value: {
      fontSize: 16,
      fontWeight: '600',
   },
});
