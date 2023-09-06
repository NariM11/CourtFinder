import React from "react";
import { TouchableOpacity, Text } from "react-native";

// button component for logging in or signing up (used in LoginScreen and SignupScreen)
// props are passed in from LoginScreen or SignupScreen and used in {blue portion} ie ({onSubmitForm})

const AuthButton = (props) => {
  const { onSubmitForm, buttonStyle, buttonText, isDisabled, buttonTextStyle } =
    props;
  return (
    <TouchableOpacity
      onPress={onSubmitForm}
      style={buttonStyle}
      disabled={isDisabled}
    >
      <Text style={buttonTextStyle}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
