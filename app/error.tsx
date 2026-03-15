import { ErrorBoundaryProps, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
   const router = useRouter();

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Something went wrong</Text>
         <Text style={styles.message}>{error.message}</Text>
         <TouchableOpacity style={styles.button} onPress={retry}>
            <Text style={styles.buttonText}>Try again</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.link} onPress={() => router.replace('/')}>
            <Text style={styles.linkText}>Go home</Text>
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      backgroundColor: '#fff',
   },
   title: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 8,
   },
   message: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      marginBottom: 32,
   },
   button: {
      backgroundColor: '#EF5350',
      paddingHorizontal: 32,
      paddingVertical: 12,
      borderRadius: 8,
      marginBottom: 12,
   },
   buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
   },
   link: {
      padding: 8,
   },
   linkText: {
      color: '#EF5350',
      fontSize: 14,
   },
});
