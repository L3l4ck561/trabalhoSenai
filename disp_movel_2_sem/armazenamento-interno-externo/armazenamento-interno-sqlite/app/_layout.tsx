import { Stack } from "expo-router";
import {setupUserDatabase} from "./src/database/userDatabase"

setupUserDatabase();

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }}/>;
}
