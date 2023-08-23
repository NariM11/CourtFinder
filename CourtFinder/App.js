import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CourtListScreen from "./screens/CourtListScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import CourtDetailsPopup from "./screens/CourtDetailsPopup";

import CourtCheckInScreen from "./screens/CourtCheckInScreen"; // import CourtListScreen from "./screns/CourtListScreen";

import { AuthProvider } from "./screens/AuthContext";

import React, { useState } from "react";

import WaitlistScreen from "./screens/WaitlistScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
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

          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Court Details" component={CourtDetailsPopup} />
          </Stack.Group>

          <Stack.Screen
            options={{ headerShown: true }}
            name="Check In"
            component={CourtCheckInScreen}
          />

          <Stack.Screen
            options={{ headerShown: true }}
            name="Waitlist"
            component={WaitlistScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
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
