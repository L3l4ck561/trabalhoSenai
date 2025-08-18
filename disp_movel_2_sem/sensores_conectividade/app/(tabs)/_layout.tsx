//import { Stack } from "expo-router";
import { Tabs } from "expo-router"; // tipo tabs
//inportando biblioteca de icones
import { MaterialIcons, Ionicons, FontAwesome,Foundation } from "react-native-vector-icons";

export default function RootLayout() {
  // return <Stack />;
  return (
    <Tabs>
      <Tabs.Screen
        name="conversas"
        options={{
          title: "Conversas",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chat" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="index1"
        options={{
          title: "Atualizações",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="index2"
        options={{
          title: "Comunidades",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="index3"
        options={{
          title: "Ligações",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Foundation name="telephone" size={size} color={color} />
          )
        }}
      />
    </Tabs>
  )
}
