import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, SectionList, TextInput } from "react-native";
import { Checkbox, IconButton, List, Menu } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";

import Screen from "../components/Screen";

import * as Authentication from "../../api/auth";
import * as Tasks from "../../api/tasks";

export default ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState({});
  const [sectionedTasks, setSectionedTasks] = useState([]);
  const [userId, setUserId] = useState(Authentication.getCurrentUserId());
  const newTaskRef = useRef();

  useEffect(() => {
    return Tasks.subscribe(userId, setTasks);
  }, []);

  useEffect(() => {
    if (tasks) {
      const sortedTasks = [];

      const tasksArray = Object.values(tasks);
      const completedTasks = tasksArray.filter((task) => task.completed);
      const pendingTasks = tasksArray.filter((task) => !task.completed);

      if (pendingTasks.length > 0) sortedTasks.push({ title: "Pending", data: pendingTasks });
      if (completedTasks.length > 0) sortedTasks.push({ title: "Completed", data: completedTasks });

      setSectionedTasks(sortedTasks);
    }
  }, [tasks]);

  const handleLogout = () => {
    setIsMenuVisible(false);

    Authentication.signOut(
      () => navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }]
      })),
      console.error
    );
  }

  const handleCreateTask = () => {
    const subject = newTask;
    setNewTask("");
    newTaskRef.current.clear();

    return Tasks.createTask(
      { userId, subject },
      () => {},
      console.error
    );
  }

  const handleCompleteTask = (taskId) => Tasks.completeTask(
    { userId: Authentication.getCurrentUserId(), taskId }, 
    () => {}, 
    console.error
  );

  const handleUncompleteTask = (taskId) => Tasks.uncompleteTask(
    { userId: Authentication.getCurrentUserId(), taskId }, 
    () => {}, 
    console.error
  );

  const handleDeleteTask = (taskId) => Tasks.deleteTask(
    { userId: Authentication.getCurrentUserId(), taskId },
    () => {},
    console.error
  );

  const renderList = ({ item, index, section, separators }) => {
    return (
      <View style={styles.taskContainer}>
        <List.Item
          title={item.subject}
          left={(props) => <Checkbox {...props} status={item.completed ? "checked" : "unchecked"} />}
          right={(props) => 
            <IconButton {...props} icon="close" onPress={() => handleDeleteTask(item.id)} />
          }
          titleStyle={item.completed ? styles.completedTaskSubject : {}}
          onPress={() => item.completed ? handleUncompleteTask(item.id) : handleCompleteTask(item.id)}
        />
      </View>
    )
  }

  return (
    <Screen>
      <SectionList
        sections={sectionedTasks}
        keyExtractor={(item, index) => item + index}
        renderItem={renderList}
        renderSectionHeader={({ section: { title }}) => <List.Subheader>{title} tasks</List.Subheader>}
        ListHeaderComponent={
          <View style={styles.header}>

            <View style={styles.addTaskContainer}>
              <IconButton icon="plus" color="#6200ee" style={{ margin: 0 }} />

              <TextInput
                ref={newTaskRef}
                style={styles.textInput}
                placeholder={`Doing something, ${Authentication.getCurrentUserName()}?`}
                onChangeText={setNewTask}
                onSubmitEditing={handleCreateTask}
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
                <Menu.Item onPress={handleLogout} title="Log out" />
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
