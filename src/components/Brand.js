import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { IconButton } from "react-native-paper";

import colors from "../constants/colors";

export default (props) => {
  return (
    <View style={styles.brand}>
      <IconButton icon="bullseye" style={{ margin: 0 }} color={colors.secondaryLight} />
      <Text style={{ fontSize: 16, color: colors.secondaryLight }}>Simplist</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  brand: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -5,
    marginTop: 20
  }
});