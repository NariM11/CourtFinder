import React from "react";
import { View, Text, Image, StatusBar } from "react-native";

// confirmation message when you book a court or book a waitlist (used in CourtCheckinScreen or WaitlistScreen)
// props are passed in from CourtCheckinScreen or WaitlistScreen and used in {blue portion} ie ({logoSource})

const ConfirmationMessage = ({
  logoSource,
  greetingText,
  primaryText,
  secondaryText,
  tertiaryText,
}) => {
  return (
    <View style={styles.container}>
      <Image source={logoSource} style={styles.logo} />

      <View style={styles.textWrapper}>
        <Text style={styles.greeting}>{greetingText}</Text>
        <Text style={styles.primary}>{primaryText}</Text>
        <Text style={styles.secondary}>{secondaryText}</Text>
        <Text style={styles.tertiary}>{tertiaryText}</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignContent: "center",
  },
  logo: {
    alignSelf: "center",
    height: 225,
    width: 225,
  },
  textWrapper: {
    margin: 20,
    alignItems: "center",
  },
  greeting: {
    alignSelf: "center",
    color: "black",
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10,
    textDecorationLine: "underline",
  },
  primary: {
    alignSelf: "center",
    color: "black",
    fontSize: 20,
    marginBottom: 50,
  },
  secondary: {
    alignSelf: "center",
    color: "black",
    fontSize: 30,
    marginBottom: 20,
  },
  tertiary: {
    alignSelf: "center",
    color: "black",
    fontSize: 20,
    marginBottom: 20,
  },
};

export default ConfirmationMessage;
