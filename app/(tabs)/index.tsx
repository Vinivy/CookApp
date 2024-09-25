import React, {  useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import SloganScreen from '@/components/Slogan/slogan';


export default function HomeScreen() {
  const [showHome, setShowHome] = useState(false);

  if (!showHome) {
    return <SloganScreen onFinish={() => setShowHome(true)} />;
  }

  return (
    <View style={styles.Home}>
      <StatusBar style="dark" />
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Home: {
    // Adicione seus estilos aqui
  },
});