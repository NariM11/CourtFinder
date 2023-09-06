import React from "react";
import { TextInput, StyleSheet } from "react-native";

// inputfield component used in LoginScreen or SignupScreen
// props are passed in from LoginScreen or SignupScreen and used in {blue portion} ie ({placeholder})

const InputField = (props) => {
  const { placeholder, onChangeText, secureTextEntry } = props;

  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="white"
      onChangeText={onChangeText}
      style={styles.input}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#B9EF37",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 5,
    fontSize: 18,
  },
});

export default InputField;
