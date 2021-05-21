import React from "react";
import { SafeAreaView, ScrollView, StatusBar } from "react-native";

export default (props) => {
  if (props.scrollable) {
    return (
      <SafeAreaView style={{
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
        ...props.style
      }} {...props}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}
          keyboardShouldPersistTaps="always"
        >
          {props.children}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
        paddingBottom: 20,
        paddingHorizontal: 20,
        ...props.style
      }} {...props}>
          {props.children}
      </SafeAreaView>
    );
  }
}