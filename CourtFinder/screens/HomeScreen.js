import React from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  StatusBar,
  Button,
  TouchableOpacity,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeScreen = ({ navigation }) => {
  const {
    container,
    seawall,
    overlay,
    logo,
    greeting,
    question,
    textWrapper,
    buttonContainer,
    button,
    buttonText,
    buttonOutline,
    buttonOutlineText,
    buttonWrapper,
  } = styles;
  return (
    <SafeAreaView style={container}>
      <ImageBackground
        source={require("../assets/homepage_background.png")}
        style={seawall}
      >
        <View style={overlay}></View>

        <Image
          source={require("../assets/logo_white.png")}
          style={logo}
        ></Image>

        <View style={textWrapper}>
          <Text style={greeting}>Welcome to CourtFinder!</Text>
          <Text style={question}>
            Looking for an available Stanley Park tennis court?
          </Text>
        </View>

        {/* <View style={buttonWrapper}>
          <Button
            color={`white`}
            title={`LOGIN`}
            onPress={() => {
              console.log("test");
            }}
          />

          <Button
            color={`black`}
            title={`SIGN UP`}
            onPress={() => {
              console.log("test");
            }}
          />
        </View> */}

        <View style={buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
              console.log("test");
            }}
            style={button}
          >
            <Text style={buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Sign Up");
              console.log("test");
            }}
            style={[button, buttonOutline]}
          >
            <Text style={[buttonOutlineText]}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignContent: "center",
    backgroundColor: "#B9EF37",
  },

  seawall: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#B9EF37",
    opacity: 0.9,
  },

  buttonContainer: {
    // width: "60%",
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 50,

    justifyContent: "flex-end",
    alignSelf: "center",
    width: "60%",
    flex: 3,
    marginBottom: 100,
  },

  button: {
    backgroundColor: "black",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "white",
    borderWidth: 2,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  buttonOutlineText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },

  logo: {
    alignSelf: "center",
    height: 225,
    width: 225,
  },

  textWrapper: {
    margin: 20,
  },

  greeting: {
    alignSelf: "center",
    color: "white",
    fontSize: 22,
    marginBottom: 20,
  },

  question: {
    alignSelf: "center",
    color: "black",
    fontSize: 15,
  },

  buttonWrapper: {
    justifyContent: "flex-end",
    flex: 3,
    marginBottom: 100,
  },
});

export default HomeScreen;
