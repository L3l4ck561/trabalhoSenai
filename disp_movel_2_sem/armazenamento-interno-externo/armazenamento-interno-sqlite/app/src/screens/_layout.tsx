import { Stack } from "expo-router";

export default function AuthLayout(){
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="perfil"/>
      <Stack.Screen name="UserRegistrationSreen"/>
    </Stack>
  )
}