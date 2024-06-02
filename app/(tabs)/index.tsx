import React, { useState } from 'react';
import { Image, StyleSheet, Platform, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FAB, Portal, Modal, Provider, Text } from 'react-native-paper';

export default function HomeScreen() {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#dbd3c5', dark: '#b0a594' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-book-logo.png')}
            style={styles.bookLogo}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Hello User!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Kupuj książki</ThemedText>
          <ThemedText>
            i <ThemedText type="defaultSemiBold">zbieraj punkty, </ThemedText>
            <ThemedText>żeby mieć zawsze tanio!</ThemedText>
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Zniżka -10% i -20%</ThemedText>
          <ThemedText>
            na 5 i 10 zakup w jednym z naszych sklepów z kartą lojalnościową.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Darmowa książka</ThemedText>
          <ThemedText>
            masz 15 punktów, to przy zakupie książek, tańszą dostaniesz za darmo!
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>
      <Portal>
        <FAB
          style={styles.fab}
          icon="information-outline"
          onPress={showModal}
        />
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalText}>Autor: Nina Stefurak (nr index:13828)</Text>
          <Image
            source={require('@/assets/images/wsei_logo.png')}  // Zmieniony plik logo
            style={styles.modalImage}
            resizeMode="contain"
          />
        </Modal>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  bookLogo: {
    height: 200,
    width: 300,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#e3d5ca',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalImage: {
    width: 250,  // Ustawienie szerokości
    height: 100, // Ustawienie wysokości
  },
});
