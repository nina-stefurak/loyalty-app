import * as React from 'react';
import { useState } from 'react';
import { ProgressBar, MD3Colors, TextInput, Button } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Platform } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as Animatable from 'react-native-animatable';

export default function TabTwoScreen() {
  const [points, setPoints] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [rewardMessage, setRewardMessage] = useState('');

  const handleAddPoints = () => {
    const newPoints = points + parseInt(inputValue, 10);
    if (newPoints >= 5) {
      setRewardMessage('Dostajesz 10% zniżki na następny zakup');
      setPoints(newPoints - 5); // Reset points after reaching 5
    } else {
      setPoints(newPoints);
    }
    setInputValue('');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f4f3ee', dark: '#353636' }}
      headerImage={<Ionicons size={250} name="book" style={styles.headerImage} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Wprowadz kod i dostań punkty</ThemedText>
        <TextInput
          label="Kod"
          value={inputValue}
          onChangeText={text => setInputValue(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <Button mode="contained" onPress={handleAddPoints} style={styles.button}>
          Dodaj punkty
        </Button>
        <ProgressBar progress={points / 5} color={MD3Colors.primary50} style={styles.progressBar} />
        <ThemedText style={styles.pointsText}>
          {points} / 5 punktów
        </ThemedText>

        <Collapsible title="Twoje prezenty">
          {rewardMessage && (
            <Animatable.Text animation="bounceIn" style={styles.rewardMessage}>
              {rewardMessage}
            </Animatable.Text>
          )}
          <ThemedText>
            Za 5 punktów dostaniesz zniżkę <ThemedText type="defaultSemiBold">10%, </ThemedText> za 10 punktów
            dostaniesz zniżkę <ThemedText type="defaultSemiBold">20%, </ThemedText> za 15 punktów dostaniesz książkę za darmo!
          </ThemedText>
        </Collapsible>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#bcb8b1',
    bottom: -30,
    left: 10,
    position: 'absolute',
  },
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    marginBottom: 20,
  },
  progressBar: {
    height: 10,
    marginBottom: 10,
  },
  pointsText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  rewardMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
});
