import React from "react";
import { TouchableOpacity, Text } from "react-native";

const HomeButton = (props) => {
  const { screenName, navigation, buttonStyle, buttonTextStyle, buttonName } =
    props;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(screenName);
        console.log("test");
      }}
      style={buttonStyle}
    >
      <Text style={buttonTextStyle}>{buttonName}</Text>
    </TouchableOpacity>
  );
};

export default HomeButton;
