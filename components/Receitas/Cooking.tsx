import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface Receita {
    id: number;
    receita: string;
    descricao: string;
    ingredientes: string;
    modo_preparo: string;
    link_imagem: string;
    tipo: string;
}

export default function Cooking() {
    const [receitas, setReceitas] = useState<Receita[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
   

    useEffect(() => {
        const fetchReceitas = async () => {
            try {
                const response = await axios.get('https://api-receitas-pi.vercel.app/receitas/todas');
                setReceitas(response.data);
            } catch (err) {
                setError('Erro ao carregar receitas');
            } finally {
                setLoading(false);
            }
        };

        fetchReceitas();
    }, []);

    if (loading) {
        return <View><Text>Carregando......</Text></View>;
    }

    if (error) {

        return <View><Text>{error}</Text></View>;
    }

    return (
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
            <View style={styles.card}> 
                {receitas.map((receita) => (
                    <View style={styles.caixa} key={receita.id}>
                        <Text>{receita.receita}</Text>
                        <Text>{receita.id}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },

    caixa: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        margin: 8,
        width: '45%', // Adjust the width to fit two items per row
    },    
});