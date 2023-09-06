import React from "react";
import { TouchableOpacity, Text } from "react-native";

// button component used in app home page (used in HomeScreen)
// props are passed in from HomeScreen and used in {blue portion} ie ({buttonStyle})

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
