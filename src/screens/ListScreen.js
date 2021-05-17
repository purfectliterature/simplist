import React, { useState } from "react";
import { StyleSheet, View, SectionList, Text, StatusBar, SafeAreaView, TextInput } from "react-native";
import { Checkbox, IconButton, List, Menu } from "react-native-paper";

import Screen from "../components/Screen";
import Brand from "../components/Brand";

class Task {
  constructor(subject, completed) {
    this.subject = subject;
    this.completed = completed;
  }
}

const lists = [
  {
    title: "Pending",
    data: [
      new Task("Pizza", false),
      new Task("Burger", false),
      new Task("Risotto", false)
    ]
  },
  {
    title: "Completed",
    data: [
      new Task("French Fries", true),
      new Task("Onion Rings", true),
      new Task("Fried Shrimps", true)
    ]
  }
]

export default ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [newTask, setNewTask] = useState("");

  const renderList = ({ item, index, section, separators }) => {
    return (
      <View style={styles.taskContainer}>
        <List.Item
          title={item.subject}
          left={(props) => <Checkbox {...props} status={item.completed ? "checked" : "unchecked"} />}
          right={(props) => 
            <IconButton {...props} icon="close" onPress={() => {}} />
          }
          titleStyle={item.completed ? styles.completedTaskSubject : {}}
          onPress={() => {}}
        />
      </View>
    )
  }

  return (
    <Screen>
      <SectionList
        sections={lists}
        keyExtractor={(item, index) => item + index}
        renderItem={renderList}
        renderSectionHeader={({ section: { title }}) => <List.Subheader>{title} tasks</List.Subheader>}
        ListHeaderComponent={
          <View style={styles.header}>

            <View style={styles.addTaskContainer}>
              <IconButton icon="plus" color="#6200ee" style={{ margin: 0 }} />

              <TextInput
                style={styles.textInput}
                placeholder="Doing something today?"
                onChangeText={setNewTask}
                onSubmitEditing={() => {}}
              />

              <Menu
                visible={isMenuVisible}
                onDismiss={() => setIsMenuVisible(false)}
                anchor={
                  <IconButton
                    icon="dots-vertical"
                    onPress={() => setIsMenuVisible((state) => !state)}
                    color="rgba(1,1,1,0.9)"
                    style={{ margin: 0 }}
                  />
                }
              >
                <Menu.Item onPress={() => {}} title="Log out" />
              </Menu>
            </View>
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 10
  },

  task: {
    borderRadius: 10
  },

  taskContainer: {
    borderRadius: 10,
    overflow: "hidden"
  },

  completedTaskSubject: {
    textDecorationLine: "line-through",
    color: "grey"
  },

  textInput: {
    fontSize: 18,
    flex: 1
  },
  
  addTaskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(1,1,1,0.05)",
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderRadius: 13,
  }
});