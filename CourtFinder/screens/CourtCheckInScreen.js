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
  Alert,
  Modal,
  Pressable,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const CourtCheckInScreen = ({ navigation }) => {
  const {
    container,
    seawall,
    overlay,
    logo,
    greeting,
    checkin,
    textWrapper,
    buttonContainer,
    button,
    buttonText,
    buttonOutline,
    buttonOutlineText,
    buttonWrapper,
    court,
  } = styles;

  return (
    <SafeAreaView style={container}>
      <Image source={require("../assets/logo_green.png")} style={logo}></Image>

      <View style={textWrapper}>
        <Text style={greeting}>IT'S YOUR TURN TO PLAY</Text>
        <Text style={checkin}>
          Please check in below before playing to start your session
        </Text>
        <Text style={court}>Court #56642</Text>
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
            console.log("test");
            // add backend here
          }}
          style={button}
        >
          <Text style={buttonText}>CHECK IN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignContent: "center",
  },

  buttonContainer: {
    // width: "60%",
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 50,

    alignSelf: "center",
    width: "50%",
    flex: 3,
  },

  button: {
    backgroundColor: "grey",
    width: "100%",
    padding: 15,
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
    color: "black",
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10,
    textDecorationLine: "underline",
  },

  checkin: {
    alignSelf: "center",
    color: "black",
    fontSize: 20,
    marginBottom: 50,
  },

  court: {
    alignSelf: "center",
    color: "black",
    fontSize: 30,
    marginBottom: 20,
  },
});

export default CourtCheckInScreen;
