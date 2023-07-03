import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitForm = async () => {
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      // Handle the response from the server
      if (response.ok) {
        // Request was successful
        const data = await response.json();
        navigation.navigate("Courts");
        console.log(data); // Example: store the authentication token or redirect to another page
      } else {
        // Request was not successful
        const errorData = await response.json();
        console.error(errorData); // Example: display error message to the user
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const {
    container,
    inputContainer,
    input,
    buttonContainer,
    button,
    buttonText,
    buttonOutline,
    buttonOutlineText,
    wrapper,
    logo,
    logInText,
  } = styles;

  return (
    <SafeAreaView style={wrapper}>
      <Image source={require("../assets/logo_green.png")} style={logo}></Image>
      <KeyboardAvoidingView style={container} behavior="padding">
        <View style={inputContainer}>
          {/* <Text style={logInText}>SIGN UP</Text> */}
          <TextInput
            placeholder="First Name"
            placeholderTextColor={`white`}
            // value = { }
            onChangeText={(text) => setFirstName(text)}
            style={input}
          ></TextInput>
          <TextInput
            placeholder="Last Name"
            placeholderTextColor={`white`}
            // value = { }
            onChangeText={(text) => setLastName(text)}
            style={input}
          ></TextInput>
          <TextInput
            placeholder="Email"
            placeholderTextColor={`white`}
            // value = { }
            onChangeText={(text) => setEmail(text)}
            style={input}
          ></TextInput>
          <TextInput
            placeholder="Password"
            placeholderTextColor={`white`}
            // value = {}
            onChangeText={(text) => setPassword(text)}
            style={input}
            secureTextEntry
          ></TextInput>
        </View>

        <View style={buttonContainer}>
          {/* <TouchableOpacity
            onPress={() => {
              console.log("test");
            }}
            style={button}
          >
            <Text style={buttonText}>LOGIN</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={onSubmitForm} style={button}>
            <Text style={buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    marginTop: 30,
  },

  input: {
    backgroundColor: "#B9EF37",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 5,
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },

  button: {
    backgroundColor: "black",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "white",
    borderWidth: 2,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  buttonOutlineText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },

  logo: {
    alignSelf: "center",
    height: 225,
    width: 225,
  },

  logInText: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 30,
  },
});

export default SignUpScreen;
