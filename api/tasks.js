import firebase from "./firebase";

const db = firebase.database();

const newTask = (id, subject, completed) => ({ id, subject, completed });

export const createTask = async ({ userId, subject }, onSuccess, onError) => {
  try {
    // push generates a new child node on the client side
    // thus allowing us to grab the correct new node id
    const task = db.ref(`tasks/${userId}`).push();
    await task.set(newTask(task.key, subject, false));
    return onSuccess(task);
  } catch (error) {
    return onError(error);
  }
}

const setTaskCompletion = async (completed, { userId, taskId }, onSuccess, onError) => {
  try {
    const task = db.ref(`tasks/${userId}/${taskId}`);
    await task.update({ completed });
    return onSuccess(task);
  } catch (error) {
    return onError(error);
  }
}

export const completeTask = ({ userId, taskId }, onSuccess, onError) => {
  return setTaskCompletion(true, { userId, taskId }, onSuccess, onError);
}

export const uncompleteTask = ({ userId, taskId }, onSuccess, onError) => {
  return setTaskCompletion(false, { userId, taskId }, onSuccess, onError);
}

export const deleteTask = async ({ userId, taskId }, onSucess, onError) => {
  try {
    await db.ref(`tasks/${userId}/${taskId}`).remove();
    return onSucess();
  } catch (error) {
    return onError(error);
  }
}

export const subscribe = (userId, onValueChanged) => {
  const tasks = db.ref(`tasks/${userId}`);
  tasks.on("value", (snapshot) => onValueChanged(snapshot.val()));
  return () => tasks.off("value");
}