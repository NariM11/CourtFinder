import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useState, useContext } from "react";

import InputField from "../assets/components/InputField";

import AuthButton from "../assets/components/AuthButton";

import AuthContext from "./AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoginStatus, setUsername, setToken } = useContext(AuthContext);

  const onSubmitForm = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Handle the response from the server
      if (response.ok) {
        // Request was successful

        const data = await response.json();
        setUsername(email); // Set the username using the email after successful login
        setLoginStatus(true);
        setToken(response.token);

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
    wrapper,
    logo,
  } = styles;

  return (
    <SafeAreaView style={wrapper}>
      <Image source={require("../assets/logo_green.png")} style={logo}></Image>
      <KeyboardAvoidingView style={container} behavior="padding">
        <View style={inputContainer}>
          <InputField placeholder="Email" onChangeText={setEmail} />
          <InputField
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={buttonContainer}>
          <AuthButton
            onSubmitForm={onSubmitForm}
            buttonStyle={button}
            buttonText="LOG IN"
            buttonTextStyle={buttonText}
          />
          {/* <TouchableOpacity onPress={onSubmitForm} style={button}>
            <Text style={buttonText}>LOG IN</Text>
          </TouchableOpacity> */}
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
    marginTop: 50,
  },
  inputContainer: {
    width: "80%",
  },

  // input: {
  //   backgroundColor: "#B9EF37",
  //   paddingHorizontal: 15,
  //   paddingVertical: 15,
  //   borderRadius: 10,
  //   marginTop: 5,
  // },

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

export default LoginScreen;
