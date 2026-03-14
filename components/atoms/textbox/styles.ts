import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 10,
      gap: 10,
   },
   icon: {
      width: 20,
      height: 20,
   },
   input: {
      flex: 1,
      fontSize: 16,
      height: 30,
      paddingVertical: 0,
   },
});
