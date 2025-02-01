import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
      const response = await axios.get('https://api-receitas-pi.vercel.app/receitas/tipo/doce');
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

  //esse são os conteudos CardAgri
  const renderItem = ({ item }: { item: Receitas }) => (
    <Pressable onPress={() => handleRecipePress(item)} style={styles.caixa} key={item.id}>
      <ImageBackground
        source={{ uri: item.link_imagem }}
        style={{ width: '100%', height: 150, justifyContent: 'flex-end', borderRadius: 10, overflow: 'hidden' }}
        imageStyle={{ borderRadius: 10,  }}
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
        //aqui são exibidos CardAgri
        <ScrollView style={styles.Scroll} indicatorStyle='default' showsHorizontalScrollIndicator={false}>
        <FlatList
          data={receitas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={true}
          numColumns={2}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.contentContainer}
        />
        <FlatList
          data={receitas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={true}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.contentContainer}
        />
        </ScrollView>
      )
      }
      <Modal
        visible={!!selectedRecipe}
        animationType="slide"
        onRequestClose={handleVoltar}
      >
        {selectedRecipe && (
          <Details receita={selectedRecipe} onVoltar={handleVoltar} />
        )}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({

contentContainer: {
    margin: 10,
    flexDirection: 'column',
    gap: 20,
    width: '100%',
},

caixa: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
},
  
receitaText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
},

tipoText: {
    color: '#fff',
},

Scroll:{
  width: '100%',
  height: '75.4%',
},

});