import React, {  useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import SloganScreen from '@/components/Slogan/slogan';
import Cooking from '@/components/Receitas/Cooking';
import Navigation from '@/components/navigation/Navigation';

//Fonts


export default function HomeScreen() {
  const [showHome, setShowHome] = useState(false);

  if (!showHome) {
    return <SloganScreen onFinish={() => setShowHome(true)} />;
  }

  return (
    <View style={styles.Home}>
      <StatusBar style="dark" />

      <Navigation/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  Home: {
    margin: 12,
  },
});