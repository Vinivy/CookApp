import React from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, FlatList, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Receitas {
  id: number;
  receita: string;
  tipo: string;
  IngredientesBase: string;
  ingredientes: string;
  modo_preparo: string;
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
          <Pressable style={styles.Back} onPress={onVoltar}>
            <Icon name="arrow-back" size={30} color="#000" />
          </Pressable>
          <View style={styles.info}>
            <Text style={styles.title}>{receita.receita}</Text>
            <Text style={styles.tempo}>30 minutos de preparo</Text>
          </View>
          <Text style={styles.Span}>Ingredientes</Text>
          <FlatList 
            contentContainerStyle={styles.NavigationIngre}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={receita.IngredientesBase[0].nomesIngrediente} 
            renderItem={({ item }) => <View style={styles.Ingredientes}><Text>{item}</Text></View>} 
            keyExtractor={(item, index) => index.toString()} />
        </View>
        <View style={styles.preparo}>
            <FlatList
            data={receita.ingredientes}
            contentContainerStyle={styles.Lista}
            renderItem={({ item }) => (
              <View>
              <Text>{item}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            />          
        </View>
        <View style={styles.modPrep}>
          <Text style={styles.Span}>Modo de preparo</Text>
          <Text>{receita.modo_preparo}</Text>
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
    flex: 1,
    flexDirection: 'column',
    left: 13,
  },

  Back:{
    alignSelf: 'flex-start',
    marginBottom: 10,
  },

  info: {
    height: 80,
    
    alignContent: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  tempo: {
    fontSize: 15,
    fontFamily: 'sans-serif',
    color: '#666',
  },

  Span: {
    fontSize: 18,
    fontWeight: 'thin',
    fontStyle: 'italic',
  },

  tipo: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },

  preparo: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },

  Ingredientes: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height:30,
    borderWidth: 1,
    borderColor: '#000000',
    marginRight: 10,
    borderRadius: 20,
    
  },

  NavigationIngre:{
    flexDirection: 'row',
    
    margin: 10,
  },

  Lista:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  modPrep: {
    padding: 20,
    borderRadius: 10,
  },

});

export default Details;
