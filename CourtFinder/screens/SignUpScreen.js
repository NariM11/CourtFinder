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
import AuthContext from "./AuthContext";

import InputField from "../components/InputField";

import AuthButton from "../components/AuthButton";

// sign up screen that shows up when press sign up button on home screen
const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoginStatus, setUsername, setToken } = useContext(AuthContext);

  // send data from input fields to check if sign up was successful
  const onSubmitForm = async () => {
    if (!firstName || !lastName || !email || !password) {
      console.log("All fields are required");
      return;
    }

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
        setUsername(email); // Set the username using the email after successful login
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
    buttonContainer,
    button,
    buttonText,
    wrapper,
    logo,
  } = styles;

  // to make button disabled if missing a field
  const isSignUpDisabled = !firstName || !lastName || !email || !password;

  return (
    <SafeAreaView style={wrapper}>
      <Image source={require("../assets/logo_green.png")} style={logo}></Image>
      <KeyboardAvoidingView style={container} behavior="padding">
        <View style={inputContainer}>
          {/* input field for first name */}
          <InputField placeholder="First Name" onChangeText={setFirstName} />

          {/* input field for last name */}
          <InputField placeholder="Last Name" onChangeText={setLastName} />

          {/* input field for email */}
          <InputField placeholder="Email" onChangeText={setEmail} />

          {/* input field for password */}
          <InputField
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={buttonContainer}>
          {/* sign up button */}
          <AuthButton
            onSubmitForm={onSubmitForm}
            buttonStyle={[button, isSignUpDisabled && styles.disabledButton]}
            buttonText="SIGN UP"
            buttonTextStyle={buttonText}
            isDisabled={isSignUpDisabled}
          />
          {/* <TouchableOpacity
            onPress={onSubmitForm}
            style={[button, isSignUpDisabled && styles.disabledButton]}
            disabled={isSignUpDisabled}
          >
            <Text style={buttonText}>SIGN UP</Text>
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
  },
  inputContainer: {
    width: "80%",
    marginTop: 30,
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
    fontSize: 18,
  },

  buttonOutlineText: {
    color: "black",
    fontWeight: "700",
    fontSize: 18,
  },

  disabledButton: {
    opacity: 0.5,
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
