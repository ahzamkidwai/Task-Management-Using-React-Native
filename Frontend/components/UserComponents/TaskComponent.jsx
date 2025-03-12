import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SingleTaskComponent from "./SingleTaskComponent";

const TaskComponent = ({ tasks }) => {
  return (
    <View style={styles.container}>
      {tasks.map((item) => (
        <View key={item._id} style={styles.taskContainer}>
          <SingleTaskComponent item={item} />
        </View>
      ))}
    </View>
  );
};

export default TaskComponent;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginVertical: "5%",
  },
  taskContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  dueDate: {
    fontSize: 12,
    color: "#888",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    color: "#d9534f",
  },
});
