import React from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  StatusBar,
} from "react-native";

import HomeButton from "../components/HomeButton";

// home screen that shows up when open app
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

        <View style={buttonContainer}>
          {/* login button */}
          <HomeButton
            navigation={navigation}
            screenName="Login"
            buttonStyle={button}
            buttonTextStyle={buttonText}
            buttonName="LOGIN"
          />

          {/* sign up button */}
          <HomeButton
            navigation={navigation}
            screenName="Sign Up"
            buttonStyle={[button, buttonOutline]}
            buttonTextStyle={buttonOutlineText}
            buttonName="SIGN UP"
          />
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
    fontSize: 18,
  },

  buttonOutlineText: {
    color: "black",
    fontWeight: "700",
    fontSize: 18,
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
    fontSize: 30,
    marginBottom: 20,
  },

  question: {
    alignSelf: "center",
    color: "black",
    fontSize: 25,
    textAlign: "center",
  },

  buttonWrapper: {
    justifyContent: "flex-end",
    flex: 3,
    marginBottom: 100,
  },
});

export default HomeScreen;
