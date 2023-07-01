import React from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  StatusBar,
} from "react-native";

const HomeScreen = () => {
  const { container, seawall, overlay } = styles;
  return (
    <SafeAreaView style={container}>
      <ImageBackground
        source={require("../assets/homepage_background.png")}
        style={seawall}
      >
        <View style={overlay}></View>
        {/* <Image source={require("../assets/logo_white.PNG")}></Image> */}
        <Text>test</Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  seawall: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#B9EF37",
    opacity: 0.5,
  },
});

export default HomeScreen;
