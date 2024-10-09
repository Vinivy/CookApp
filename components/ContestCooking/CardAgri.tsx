import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Details from './Details';

interface Receitas {
  id: number;
  receita: string;
  tipo: string;
  link_imagem: string;
}

export default function CardAgri() {
  const [receitas, setReceitas] = useState<Receitas[]>([]); // Use plural for consistency
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Receitas | null>(null);

  const fetchReceitas = async () => {
    try {
      const response = await axios.get('https://api-receitas-pi.vercel.app/receitas/tipo/agridoce');
      setReceitas(response.data);
    } catch (err) {
      setError('Erro ao carregar receitas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceitas();
  }, []);

  const handleRecipePress = (receita: Receitas) => {
    setSelectedRecipe(receita);
  };

  const handleVoltar = () => {
    setSelectedRecipe(null);
  };

  const renderItem = ({ item }: { item: Receitas }) => (
    <Pressable onPress={() => handleRecipePress(item)} style={styles.caixa} key={item.id}>
      <ImageBackground
        source={{ uri: item.link_imagem }}
        style={{ width: '100%', height: 150, justifyContent: 'flex-end' }}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={{ padding: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <Text style={styles.receitaText}>{item.receita}</Text>
          <Text style={styles.tipoText}>{item.tipo}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );

  return (
    <>
      {loading ? (
        <ActivityIndicator size={50} color="#02966e" />
      ) : error ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : (
        <FlatList
          data={receitas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.contentContainer}
        />
      )}
      {selectedRecipe && <Details/>}
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    paddingBottom: 200, // Adjust the value as needed
  },

  caixa: {
    width: '50%', // Set a specific width for consistency
    marginBottom: 20, // Spacing between items
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },

  receitaText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  tipoText: {
    color: '#fff',
  },
});