import { Pressable, StyleSheet, Text, View } from "react-native";
import Cooking from "../Receitas/Cooking";
import { useState } from "react";

export default function Navigation() {
    const [Tipo, setTipo] = useState<string | null>(null);	
    //functions de optiosn para tipos de receitas
    function Doce(){
        setTipo('doce');
    };

    function Salgada() {
        setTipo('salgada');
    }

    function Agridoce() {
        setTipo('agridoce');
    };

    
    return (
        <View style={styles.Hm}>
            <Text style={styles.Title}>Escolha</Text>
            <Text style={styles.P}>os Produtos</Text>
            <Text style={styles.Descriptions}>Descubra receitas baseadas nos produtos que você escolheu.</Text>

            <View style={styles.options}>
                <Pressable onPress={Doce} style={styles.doces}>
                    <Text>Doces</Text>
                </Pressable>
            
                <Pressable onPress={Salgada} style={styles.salgadas}>
                    <Text>Salgadas</Text>
                </Pressable>
                            
                <Pressable onPress={Agridoce} style={styles.agridoces}>
                    <Text>AgriDoces</Text>
                </Pressable>
            </View>
            <View style={styles.container}>
                
            </View>
            <Cooking />
        </View>
    )
}

const styles = StyleSheet.create({
    Hm: {

    },
    
    Title:{
        fontSize: 40,
        fontWeight: 'bold',
    },
    
    P:{
        fontSize: 40,
        fontWeight: 'bold',
    },
    
    Descriptions:{
        fontSize: 15,
        fontWeight: 'thin',
    },

    options:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20,
        paddingBottom: 20,
    },
    
    doces:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height:30,
        borderWidth: 1,
        borderColor: '#000000',
        
        borderRadius: 20,
    },

    salgadas:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height:30,
        borderWidth: 1,
        borderColor: '#000000',
        
        borderRadius: 20,
    },

    agridoces:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height:30,
        borderWidth: 1,
        borderColor: '#000000',
        
        borderRadius: 20,
    },

    container:{
        
    }
});