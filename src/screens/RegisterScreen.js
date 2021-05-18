import React, { useState, useRef } from "react";
import { Pressable, StyleSheet, Text, Keyboard } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";

import Screen from "../components/Screen";
import Brand from "../components/Brand";

import colors from "../constants/colors";

import * as Authentication from "../../api/auth";

export default ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const emailTextInput = useRef();
  const passwordTextInput = useRef();

  const handleRegister = () => {
    Keyboard.dismiss();
    setIsRegisterLoading(true);

    Authentication.createAccount(
      { name: username, email, password },
      (user) => navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{
          name: "List",
          params: { name: user.displayName }
        }]
      })),
      (error) => {
        setIsRegisterLoading(false);
        return console.error(error);
      }
    );
  }

  return (
    <Screen scrollable>
      <Brand />

      <Text style={styles.title}>Free productivity coming your way.</Text>
      <Text style={styles.subtitle}>Let's create your Simplist account!</Text>

      <TextInput
        mode="outlined"
        label="Your name"
        placeholder="e.g., Albert Einstein Tan Chow Boon"
        style={{ marginTop: 10 }}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="words"
        returnKeyType="next"
        onSubmitEditing={() => emailTextInput.current.focus()}
        blurOnSubmit={false}
        left={<TextInput.Icon name="account" color={username ? colors.primary : colors.secondaryLight} />}
      />

      <TextInput
        ref={emailTextInput}
        mode="outlined"
        label="Email address"
        placeholder="e.g., josh@example.com"
        keyboardType="email-address"
        style={{ marginTop: 10 }}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => passwordTextInput.current.focus()}
        blurOnSubmit={false}
        left={<TextInput.Icon name="at" color={email ? colors.primary : colors.secondaryLight} />}
      />

      <TextInput
        ref={passwordTextInput}
        mode="outlined"
        label="Password"
        placeholder="e.g., who knows?"
        style={{ marginTop: 10 }}
        value={password}
        onChangeText={setPassword}
        left={<TextInput.Icon name="form-textbox-password" color={password ? colors.primary : colors.secondaryLight} />}
        secureTextEntry={!isPasswordVisible}
        autoCapitalize="none"
        right={<TextInput.Icon name={isPasswordVisible ? "eye-off" : "eye"} onPress={() => setIsPasswordVisible((state) => !state)} />}
      />

      <Button
        mode="contained"
        style={{ marginTop: 20, borderRadius: 10 }}
        contentStyle={{ paddingVertical: 5 }}
        onPress={handleRegister}
        loading={isRegisterLoading}
        disabled={isRegisterLoading}
      >Create account</Button>

      <Text style={{ color: colors.secondaryLight, paddingHorizontal: 10, paddingTop: 10 }}>
        By proceeding and tapping on Create Account, you agree to Simplist's Terms of Service and Privacy Policy.
      </Text>

      <Pressable onPress={() => {}}>
        <Text style={styles.link}>Privacy policy</Text>
      </Pressable>

      <Pressable onPress={() => {}}>
        <Text style={styles.link}>Terms of Service</Text>
      </Pressable>

      <Button
        mode="outlined"
        style={{ marginTop: 20, borderRadius: 10 }}
        contentStyle={{ paddingVertical: 5 }}
        onPress={() => navigation.goBack()}
        icon="arrow-left"
      >Log in instead</Button>
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

  link: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
    color: colors.secondaryLight
  }
});