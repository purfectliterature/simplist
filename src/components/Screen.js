import React from "react";
import { SafeAreaView, ScrollView, StatusBar } from "react-native";

export default (props) => {
  if (props.scrollable) {
    return (
      <SafeAreaView style={{
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0
      }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}>
          {props.children}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
        paddingBottom: 20,
        paddingHorizontal: 20
      }}>
          {props.children}
      </SafeAreaView>
    );
  }
}