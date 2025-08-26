import { Text, View, StyleSheet, Button } from "react-native";
import {useRouter, useLocalSearchParams} from "expo-router"

export default function Login() {
    const router = useRouter()
    const params = useLocalSearchParams()

    const Sair = () => {
        router.replace("../auth/login")
    }
    return (
        <View>
            <View style={style.header}>
            <Text style={style.title}>Bem vindo! {params.name}</Text>
            <Button title='Sair' onPress={Sair}></Button>
            </View>
        
            

        </View>
    );
}

const style = StyleSheet.create({
    header:{
        backgroundColor:'#4ea4ebff',
        paddingTop:40,
    },
    containerLogin: {
        padding: 20,
        width: '90%',
        boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
        borderRadius: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'#fff',
        marginLeft:10
    },
    input: {
        padding: 5,
        borderRadius: 10,
        width: '100%',
        marginBottom: 10,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderColor: "rgba(65, 65, 65, 0.5)",
    },
})