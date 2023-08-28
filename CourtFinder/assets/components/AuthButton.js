import React from "react";
import { TouchableOpacity, Text } from "react-native";

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
