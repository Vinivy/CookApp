import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Emoji from 'react-native-emoji';


interface SloganScreenProps {
  //se, retorno de função
  onFinish: () => void;
}

export default function SloganScreen({ onFinish }: SloganScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);  // 5 segundos

    return () => clearTimeout(timer);  // Limpa o timer se o componente desmontar
  }, [onFinish]);

  return (
    <View style={styles.Container}>
      <Emoji name="apple" style={styles.Apple} />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },

  Apple: {
    fontSize: 60,
  },
});