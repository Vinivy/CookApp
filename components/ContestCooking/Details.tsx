import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

interface Receitas {
  id: number;
  receita: string;
  tipo: string;
  link_imagem: string;
}

export default function CardAgri() {
  const [receitas, setReceitas] = useState<Receitas[]>([]);
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

  const handleVoltar = () => {
    setSelectedRecipe(null);
  };

  const renderItem = ({ item }: { item: Receitas }) => (
    <Pressable style={styles.card} key={item.id}>
      <ImageBackground
        source={{ uri: item.link_imagem }}
        style={styles.imagemDetalhe}
        imageStyle={{ borderRadius: 10 }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.titulo}>{item.receita}</Text>
        <Text style={styles.tipo}>{item.tipo}</Text>
      </View>
      <Button title="Voltar" onPress={handleVoltar} />
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
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        height: '80%',
        marginBottom: 20,
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
  contentContainer: {
    flexDirection: 'row',
    paddingBottom: 200, // Adjust the value as needed
  },

  imagemDetalhe: {
    width: '100%',
    height: 200,
  },

  infoContainer: {
    padding: 10,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  tipo: {
    fontSize: 18,
  },
});