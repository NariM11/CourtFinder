import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CourtListScreen from "./screens/CourtListScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import CourtDetailsPopup from "./screens/CourtDetailsPopup";
// import CourtListScreen from "./screns/CourtListScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            options={{ headerShown: true }}
            name="Home"
            component={HomeScreen}
          />

          <Stack.Screen
            options={{ headerShown: true }}
            name="Login"
            component={LoginScreen}
          />

          <Stack.Screen
            options={{ headerShown: true }}
            name="Sign Up"
            component={SignUpScreen}
          />

          <Stack.Screen
            options={{ headerShown: true }}
            name="Courts"
            component={CourtListScreen}
          />
        </Stack.Group>

        {/* <RootStack.Group screenOptions={{ presentation: "modal" }}>
          <RootStack.Screen name="MyModal" component={ModalScreen} />
        </RootStack.Group> */}

        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Court Details" component={CourtDetailsPopup} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
