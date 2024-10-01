import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, Text } from 'react-native';

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

    useEffect(() => {
    setLoading(true);
    const fetchReceitas = async () => {
        try {
            const response = await axios.get('https://api-receitas-pi.vercel.app/receitas/tipo/todas');
            setReceitas(response.data);
        } catch (err) {
            setErro('Erro ao carregar receitas');
        } finally {
            setLoading(false);
        }
    };

        fetchReceitas();
    }, []);
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
        </>
    )
}

const styles = StyleSheet.create({
    
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
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
    },

    Rows: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});