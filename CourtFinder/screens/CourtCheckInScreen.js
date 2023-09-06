import React from "react";

import { StyleSheet, SafeAreaView } from "react-native";
import ConfirmationMessage from "../components/ConfirmationMessage";

// screen that shows up when have booked a court
const CourtCheckInScreen = ({ route }) => {
  const { selectedCourtNumber } = route.params;

  const { container } = styles;

  return (
    <SafeAreaView style={container}>
      <ConfirmationMessage
        logoSource={require("../assets/logo_green.png")}
        greetingText="IT'S YOUR TURN TO PLAY"
        primaryText="Please head to your court now"
        secondaryText={`Court Number #${selectedCourtNumber}`}
        tertiaryText="YOUR 1 HOUR BOOKING STARTS NOW"
        buttonText="CHECK IN"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CourtCheckInScreen;
