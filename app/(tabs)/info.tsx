import { View, Text, StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function InfoScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Informacja o autorach</ThemedText>
      <ThemedText type="subtitle" style={styles.author}>Nina Stefurak</ThemedText>
      <ThemedText>nr index: 13828</ThemedText>
      <Image source={require('@/assets/images/wsei_logo.png')} style={styles.logo} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
    marginTop: 20,
  },
});
