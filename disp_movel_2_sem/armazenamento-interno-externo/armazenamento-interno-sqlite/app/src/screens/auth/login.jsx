import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { useRouter, Link } from "expo-router"
import { useState } from "react";
import { getUsersByCpf } from "../../database/userDatabase";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
    const [cpf, setCpf] = useState('')
    const router = useRouter()

    const handleLogin = () => {
        if (!cpf.trim()) {
            alert("Erro. Digite um cpf")
            return
        }
        const user = getUsersByCpf(cpf)
        if (user) {
            router.push({ pathname: './perfil', params: { nome: user.name } })
        } else {
            alert('falha no Login. Tente novamente')
        }

    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.containerLogin}>
                <Text style={style.title}>Login</Text>
                <TextInput
                    style={style.input}
                    placeholder="Digite seu CPF"
                    value={cpf}
                    onChangeText={setCpf}
                />
                <Button title='Entrar' color={'green'} onPress={handleLogin} />
                <View style={{ alignItems: 'flex-end', marginTop: 10 }}>

                    <Link href="./UserRegistrationSreen" style={{ color: 'blue' }}>
                        Cadastre-se
                    </Link>

                </View>

            </View>

        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
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