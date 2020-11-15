import * as React from "react";
import { useContext, useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import LoggedInContext from "../context/LoggedInContext";
import useColorScheme from "../hooks/useColorScheme";

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const [name, setName] = useState("");
  const [_, setUsername] = useContext(LoggedInContext);

  const onPress = () => {
    setUsername(name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your name</Text>
      <TextInput
        style={[styles.input, { color: Colors[colorScheme].tint }]}
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Button
        onPress={onPress}
        title="Continue"
        color={Colors[colorScheme].success}
        accessibilityLabel="Continue to chat app"
        disabled={!name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "#cecece",
    borderWidth: 0,
    borderBottomWidth: 1,
    width: 160,
    marginTop: 12,
    padding: 8,
    marginBottom: 14,
    fontSize: 20,
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingTop: 180,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
  },
});
