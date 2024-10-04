import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Details from './Details';


interface Receitas {
    id: number;
    receita: string;
    tipo: string;
    link_imagem: string;
}

export default function CardAgri() {
    const [erro, setErro] = useState<string | null>(null);
    const [receita, setReceitas] = useState<Receitas[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [descricao, setDescricao] = useState<string | null>(null);

    const mostrarDetalhes = (receita: Receitas) => {
        setDescricao(receita.receita);
    };

    const voltar = () => {
        setDescricao(null);
    };

    if (descricao) {
        return <Details Receita={descricao} onVoltar={voltar} />;
    }
    useEffect(() => {
    setLoading(true);
    const fetchReceitas = async () => {
        try {
            const response = await axios.get('https://api-receitas-pi.vercel.app/receitas/tipo/agridoce');
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
                <Text>{erro}</Text>
                )
            }
                
                <FlatList
                style={styles.contentContainer}
                  data={receita}
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={true}
                  renderItem={({ item }) => (
                    
                      <Pressable style={styles.caixa} key={item.id}>
                        <ImageBackground source={{ uri: item.link_imagem }} style={{ width: '100%', height: 150, justifyContent: 'flex-end' }} imageStyle={{ borderRadius: 10 }} >
                          <View style={{ padding: 10}}>
                            <Text>{item.receita}</Text>
                            <Text>{item.tipo}</Text>
                          </View>
                        </ImageBackground>
                      </Pressable>
                    
                    )}

                  numColumns={2}
                  onEndReachedThreshold={0.5} // Definindo quando carregar mais
                />
                
        </>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        paddingBottom: 200, // Ajuste o valor conforme necessário
    },

    card: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },

    caixa: {
        width: 'auto', // Ajusta a largura dos itens
        marginBottom: 20, // Espaçamento entre os itens
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
});