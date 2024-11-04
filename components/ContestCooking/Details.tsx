import React from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, FlatList } from 'react-native';

interface Receitas {
  id: number;
  receita: string;
  tipo: string;
  link_imagem: string;
}

interface DetailsProps {
  receita: Receitas;
  onVoltar: () => void;
}

const Details: React.FC<DetailsProps> = ({ receita, onVoltar }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.Scroll} indicatorStyle='default' showsHorizontalScrollIndicator={false}>
        <Image source={{ uri: receita.link_imagem }} style={styles.image} />
        <View style={styles.description}>
          <Button  title="Voltar" onPress={onVoltar} />
          <Text style={styles.title}>{receita.receita}</Text>
          <Text style={styles.tipo}>{receita.tipo}</Text>
        </View>

        <View style={styles.mododepreparo}>
          <Text>Ingredientes</Text>
          <FlatList
            data={receita.ingredientes}
            renderItem={({ item }) => <Text>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
          <Text>Modo de Preparo:</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },

  Scroll:{
    width: '99%',
    height: '100%',
  },

  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },

  description:{

  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  tipo: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
});

export default Details;
