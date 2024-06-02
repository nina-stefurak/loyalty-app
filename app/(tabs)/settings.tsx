import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Picker } from '@react-native-picker/picker';

export default function SettingsScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Ustawienia</ThemedText>
      
      <View style={styles.optionContainer}>
        <ThemedText type="subtitle">Motyw ciemny</ThemedText>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
        />
      </View>

      <View style={styles.optionContainer}>
        <ThemedText type="subtitle">Język</ThemedText>
        <Picker
          selectedValue={language}
          style={styles.picker}
          onValueChange={(itemValue: React.SetStateAction<string>) => setLanguage(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Polski" value="pl" />
          {/* Dodaj więcej opcji językowych w razie potrzeby */}
        </Picker>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 150,
  },
});
