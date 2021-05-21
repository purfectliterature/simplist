import React, { useEffect } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { CommonActions } from "@react-navigation/native";

import Screen from "../components/Screen";

import * as Authentication from "../../api/auth";

export default ({ navigation }) => {
  useEffect(() => {
    return Authentication.setOnAuthStateChanged(
      () => navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "List" }] })),
      () => navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Login" }] })),
    );
  }, []);

  return (
    <Screen style={styles.screen}>
      <ActivityIndicator animating size="large" color="black" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    flex: 1
  }
});