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

const WaitlistScreen = ({ route }) => {
  const {
    selectedCourtNumber,
    selectedCourtWaitingList,
    selectedCourtWaitingTime,
  } = route.params;

  const onPressCancel = () => {
    console.log("test");
    // add backend here
  };

  const {
    container,
    // logo,
    // greeting,
    // checkin,
    // textWrapper,
    // buttonContainer,
    // button,
    // buttonText,
    // court,
    // wait,
  } = styles;

  return (
    <SafeAreaView style={container}>
      <ConfirmationMessage
        logoSource={require("../assets/logo_green.png")}
        greetingText="You've been added to the waitlist!"
        primaryText={`POSITION ON WAITING LIST: ${selectedCourtWaitingList}`}
        secondaryText={`Court Number #${selectedCourtNumber}`}
        tertiaryText={`ESTIMATED WAITING TIME: ${selectedCourtWaitingTime}`}
        buttonText="CANCEL"
        onPressButton={onPressCancel}
      />
      {/* <Image source={require("../assets/logo_green.png")} style={logo}></Image>

      <View style={textWrapper}>
        <Text style={greeting}>You've been added to the waitlist!</Text>
        <Text style={checkin}>
          {`POSITION ON WAITING LIST: ${selectedCourtWaitingList}`}
        </Text>
        <Text style={court}>{`Court Number #${selectedCourtNumber}`} </Text>
        <Text style={wait}>
          {`ESTIMATED WAITING TIME: ${selectedCourtWaitingTime}`}
        </Text>
      </View>

      <View style={buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            console.log("test");
            // add backend here
          }}
          style={button}
        >
          <Text style={buttonText}>CANCEL</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    // alignContent: "center",
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
  //   alignItems: "center",
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

  // wait: {
  //   alignSelf: "center",
  //   color: "black",
  //   fontSize: 20,
  //   marginBottom: 20,
  // },
});

export default WaitlistScreen;
