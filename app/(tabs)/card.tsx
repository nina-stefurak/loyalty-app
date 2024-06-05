import * as React from 'react';
import { useState, useEffect } from 'react';
import { ProgressBar, MD3Colors, TextInput, Button } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Platform } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as Animatable from 'react-native-animatable';
import { libraryService } from '@/service/library-service';
import { pointsRepository } from '@/repository/points-repository';

export default function TabTwoScreen() {
  const [points, setPoints] = useState(0);
  const [rewardMessages, setRewardMessages] = useState(new Array<string>());
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  
  useEffect(() => {
    pointsRepository.getPoints().then(points => {
      setPoints(points);
      handleRewards(points);
    })
  }, [points]);
  const [inputValue, setInputValue] = useState('');

  const maxPointsAmount = ():number => {
    if(points <= 5) {
      return 5
    } else if(points > 5 && points % 5 !== 0){
      return 5 * Math.ceil(points/5);
    } else if(points > 5 && points % 5 === 0){
      return 5 * points/5
    }
    return 5;
  }


  const handleAddPoints = async () => {
    const isValidCode = await libraryService.verifyCode(parseInt(inputValue));
    console.log("IsValidPoints:" + isValidCode);
    let newPoints = await points;

    if(isValidCode){
      newPoints++;
      await pointsRepository.addPoints(1);
    } else {
      // popup -> code is not valid
      setError('Kod jest nieprawidłowy');
      setShowSnackbar(true);
    }
    setPoints(newPoints);
   
    setInputValue('');
  };
   const handleRemovePoints = async () => {
    let newPoints = await points;
    newPoints--;
    await pointsRepository.removePoints(5);

    setPoints(newPoints);
   };

  const handleRewards = (points: number) => {
    setRewardMessages([]);
    rewardMessages.length = 0;
    const rewardCount: number = Math.floor(points/5);
    for(let i=0; i< rewardCount; i++) {
      rewardMessages.push('Dostajesz 10% zniżki na następny zakup');
    }
    setRewardMessages(rewardMessages);
    console.log(`Rewards messages: ${rewardMessages}`);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f4f3ee', dark: '#353636' }}
      headerImage={<Ionicons size={200} name="book" style={styles.headerImage} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Wprowadz kod i dostań punkty</ThemedText>
        <TextInput
          label="Kod"
          value={inputValue}
          activeUnderlineColor={'#9a8c98'}
          onChangeText={text => {
            setInputValue(text);
            setError(''); // Clear error when user starts typing
          }}
          style={styles.input}
          keyboardType="numeric"
          error={!!error} // Show error state if there is an error
        />
        {!!error && (
          <ThemedText style={styles.errorText}>
            {error}
          </ThemedText>
        )}
        <Button 
          mode="contained" 
          onPress={handleAddPoints} 
          style={styles.button}
          disabled={!inputValue}>
          Dodaj punkty
        </Button>
        <ProgressBar progress={points / maxPointsAmount()} color={'#bcb8b1'} style={styles.progressBar} />
        <ThemedText style={styles.pointsText}>
          {points} / {maxPointsAmount()} punktów
        </ThemedText>

        <Collapsible title="Twoje prezenty">
          {rewardMessages && rewardMessages.map((message, index) =>(
            <Animatable.Text key={index} animation="bounceIn" style={styles.rewardMessage}>
              {message}
            </Animatable.Text>
          ))}
          <ThemedText>Za każde 5 punktów dostaniesz zniżkę 10%</ThemedText>
        </Collapsible>
        <Button 
          mode="contained" 
          onPress={handleRemovePoints} 
          style={styles.button}>
          Wykorzystaj zniżkę
        </Button>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#bcb8b1',
    bottom: 10,
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
    marginTop: 16,
    marginBottom: 24,
    backgroundColor: '#bcb8b1',
  },
  progressBar: {
    height: 30,
    marginBottom: 10,
    backgroundColor: '#EDEDE9'
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
