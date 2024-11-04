import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCallback, useState } from "react";
import CardDoce from "../ContestCooking/CardDoce";
import CardSalgado from "../ContestCooking/CardSalgado";
import CardAgri from "../ContestCooking/CardAgri";
import CardGeral from "../ContestCooking/CardGeral";

interface Typagem {
    Tipo: string;
}

export default function Navigation() {
    const [tipo, setTipo] = useState<string | null>(null);
    let SelectedComponent = <CardGeral />;

    if (tipo === "Doce") {
        SelectedComponent = <CardDoce />;
    } else if (tipo === "Salgada") {
        SelectedComponent = <CardSalgado />;
    } else if (tipo === "Agridoce") {
        SelectedComponent = <CardAgri />;
    }else if (tipo === null){
        SelectedComponent = <CardGeral />;
    }

    // Funções para definir o tipo de receita
    const Doce = () => {
        setTipo("Doce");
    };
    
    const Salgada = () => {
        setTipo("Salgada");
    };

    const Agridoce = () => {
        setTipo("Agridoce");
    };

    const resetOptions = useCallback(() => {
        setTipo(null);
        return <CardGeral />;
    }, [<CardGeral />]);


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

            <View>
            {SelectedComponent} 
            </View>
        </View>
    );
};

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
        paddingBottom: 10,
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