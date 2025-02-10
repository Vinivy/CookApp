import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import Details from './Details';

interface Receita {
    id: number;
    receita: string;
    tipo: string;
    link_imagem: string;
}

export default function CardAgri() {
    const [erro, setErro] = useState<string | null>(null);
    const [receita, setReceitas] = useState<Receita[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedRecipe, setSelectedRecipe] = useState<Receita | null>(null);

    useEffect(() => {
    setLoading(true);
    const fetchReceitas = async () => {
        try {
            const response = await axios.get('https://api-receitas-pi.vercel.app/receitas/todas');
            setReceitas(response.data);
        } catch (err) {
            setErro('Erro ao carregar receitas');
        } finally {
            setLoading(false);
        }
    };

        fetchReceitas();
    }, []);
    
      const handleVoltar = () => {
        setSelectedRecipe(null);
      };
    return (
        <>
            {// Mostra o loading enquanto carrega as receitas
            loading ? ( 
                <ActivityIndicator size={50} color={"#02966e"}/>
                 )     : (
                <Text style={{fontSize: 50}}>{erro}</Text>
                )
            }
                
                <FlatList
                  data={receita}
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={true}
                  renderItem={({ item }) => (
                      <Pressable style={styles.caixa} key={item.id}>
                          <Text>{item.id}</Text>
                          <Image source={{ uri: item.link_imagem }} style={{ width: 100, height: 100 }} />
                          <Text>{item.receita}</Text>
                          <Text>{item.tipo}</Text>
                      </Pressable>
                    )}
                />
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
      flexDirection: 'column',
      paddingBottom: 200, // Ajuste o valor conforme necessário
  },
  
  card: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
  },
  
  caixa: {
      width: '40%', // Ajusta a largura dos itens
      marginBottom: 20, // Espaçamento entre os itens
      padding: 10,
      margin: 15,
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
  
  Rows: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
  }
  });