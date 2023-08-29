import React from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import ConfirmationMessage from "../assets/components/ConfirmationMessage";

const CourtCheckInScreen = ({ route }) => {
  const { selectedCourtNumber } = route.params;

  const {
    container,
    //   logo,
    //   greeting,
    //   checkin,
    //   textWrapper,
    //   buttonContainer,
    //   button,
    //   buttonText,
    //   court,
  } = styles;

  const onPressCheckIn = () => {
    console.log("test");
    // add backend here
  };

  return (
    <SafeAreaView style={container}>
      <ConfirmationMessage
        logoSource={require("../assets/logo_green.png")}
        greetingText="IT'S YOUR TURN TO PLAY"
        primaryText="Please check in below before playing to start your session"
        secondaryText={`Court Number #${selectedCourtNumber}`}
        tertiaryText="YOUR BOOKING IS FOR 1 HOUR"
        buttonText="CHECK IN"
        onPressButton={onPressCheckIn}
      />
      {/* <Image source={require("../assets/logo_green.png")} style={logo}></Image>

      <View style={textWrapper}>
        <Text style={greeting}>IT'S YOUR TURN TO PLAY</Text>
        <Text style={checkin}>
          Please check in below before playing to start your session
        </Text>
        <Text style={court}>{`Court Number #${selectedCourtNumber}`} </Text>
      </View>

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
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // buttonContainer: {
  //   alignSelf: "center",
  //   width: "50%",
  //   flex: 3,
  // },

  // button: {
  //   backgroundColor: "grey",
  //   width: "100%",
  //   padding: 15,
  //   alignItems: "center",
  // },

  // buttonOutline: {
  //   backgroundColor: "white",
  //   marginTop: 5,
  //   borderColor: "white",
  //   borderWidth: 2,
  // },

  // buttonText: {
  //   color: "white",
  //   fontWeight: "700",
  //   fontSize: 16,
  // },

  // buttonOutlineText: {
  //   color: "black",
  //   fontWeight: "700",
  //   fontSize: 16,
  // },

  // logo: {
  //   alignSelf: "center",
  //   height: 225,
  //   width: 225,
  // },

  // textWrapper: {
  //   margin: 20,
  // },

  // greeting: {
  //   alignSelf: "center",
  //   color: "black",
  //   fontSize: 20,
  //   marginBottom: 20,
  //   marginTop: 10,
  //   textDecorationLine: "underline",
  // },

  // checkin: {
  //   alignSelf: "center",
  //   color: "black",
  //   fontSize: 20,
  //   marginBottom: 50,
  // },

  // court: {
  //   alignSelf: "center",
  //   color: "black",
  //   fontSize: 30,
  //   marginBottom: 20,
  // },
});

export default CourtCheckInScreen;
