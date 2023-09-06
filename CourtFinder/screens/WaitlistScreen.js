import React from "react";

import { StyleSheet, SafeAreaView } from "react-native";

import ConfirmationMessage from "../components/ConfirmationMessage";

const WaitlistScreen = ({ route }) => {
  const {
    selectedCourtNumber,
    selectedCourtWaitingList,
    selectedCourtWaitingTime,
  } = route.params;

  const { container } = styles;

  return (
    <SafeAreaView style={container}>
      <ConfirmationMessage
        logoSource={require("../assets/logo_green.png")}
        greetingText="You've been added to the waitlist!"
        primaryText={`POSITION ON WAITING LIST: ${selectedCourtWaitingList}`}
        secondaryText={`Court Number #${selectedCourtNumber}`}
        tertiaryText={`ESTIMATED WAITING TIME: ${selectedCourtWaitingTime}`}
        buttonText="CANCEL"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WaitlistScreen;
