import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';

interface Ingredientes {
    id: number;
    receita: string;
    tipo: string;
    link_imagem: string;
}

const [Engredientes, setEngredientes] = useState<Ingredientes | null>(null);
const [erro, setErro] = useState<string | null>(null);
const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
    setLoading(true);
    const fetchReceitas = async () => {
        try {
            const response = await axios.get('https://api-receitas-pi.vercel.app/receitas/tipo/agridoce');
            setEngredientes(response.data);
        } catch (err) {
            setErro('Erro ao carregar receitas');
        } finally {
            setLoading(false);
        }
    };

    fetchReceitas();
}, []);

export default function Details({Receita, onVoltar}){
    return (
        <View style={styles.detalhesContainer}>
            <Text style={styles.titulo}>{Receita.receita}</Text>
            <ImageBackground source={{ uri: Receita.link_imagem }} style={styles.imagemDetalhe} />
            <Text style={styles.tipo}>{Receita.tipo}</Text>
            <Button title="Voltar" onPress={onVoltar} />
        </View>
    );
};

const styles = StyleSheet.create({
    detalhesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    imagemDetalhe: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    tipo: {
        fontSize: 18,
        marginBottom: 20,
    },
});