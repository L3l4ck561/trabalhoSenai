import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { router } from "expo-router"

export default function Login() {
    const Logar = () => {
        router.replace("/(tabs)/conversas")
    }
    return (
        <View style={estilo.container}>
            <TouchableOpacity onPress={Logar} style={estilo.digital}>
                <Text style={{color:'#fff'}}>
                    Digital
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    digital:{
        backgroundColor: 'blue',
        padding:20,
        borderRadius:30,
        textAlign:'center'
    }
})