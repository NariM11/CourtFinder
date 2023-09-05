import React from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";

const ConfirmationMessage = ({
  logoSource,
  greetingText,
  primaryText,
  secondaryText,
  tertiaryText,
  buttonText,
  onPressButton,
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

      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPressButton} style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignContent: "center",
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
  // buttonText: {
  //   color: "white",
  //   fontWeight: "700",
  //   fontSize: 16,
  // },
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
