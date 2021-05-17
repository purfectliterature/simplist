import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";

import Screen from "../components/Screen";
import Brand from "../components/Brand";

import colors from "../constants/colors";

export default ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Screen scrollable>
      <Brand />

      <Text style={styles.title}>Continue being productive.</Text>
      <Text style={styles.subtitle}>Let's log in to your account!</Text>

      <TextInput
        mode="outlined"
        label="Email address"
        placeholder="e.g., josh@example.com"
        keyboardType="email-address"
        style={{ marginTop: 10 }}
        value={email}
        onChangeText={setEmail}
        left={<TextInput.Icon name="at" color={email ? colors.primary : colors.secondaryLight} />}
      />

      <TextInput
        mode="outlined"
        label="Password"
        placeholder="e.g., who knows?"
        style={{ marginTop: 10 }}
        value={password}
        onChangeText={setPassword}
        left={<TextInput.Icon name="form-textbox-password" color={password ? colors.primary : colors.secondaryLight} />}
        secureTextEntry={!isPasswordVisible}
        right={<TextInput.Icon name={isPasswordVisible ? "eye-off" : "eye"} onPress={() => setIsPasswordVisible((state) => !state)} />}
      />

      <Button
        mode="contained"
        style={{ marginTop: 20, borderRadius: 10 }}
        contentStyle={{ paddingVertical: 5 }}
        onPress={() => {}}
      >Log in</Button>

      <Pressable onPress={() => {}}>
        <Text style={styles.forgotPasswordLink}>Forgot something?</Text>
      </Pressable>

      <Button
        mode="outlined"
        style={{ marginTop: 20, borderRadius: 10 }}
        contentStyle={{ paddingVertical: 5 }}
        onPress={() => navigation.navigate("Register")}
      >Create an account</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "bold",
    paddingTop: 30
  },

  subtitle: {
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 10
  },

  forgotPasswordLink: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
    color: colors.secondaryLight
  }
});