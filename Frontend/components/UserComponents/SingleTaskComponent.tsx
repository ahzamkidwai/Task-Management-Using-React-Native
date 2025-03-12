import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SingleTaskComponent = ({ item }) => {
  return (
    <View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.dueDate}>
        Due Date: {new Date(item.dueDate).toLocaleDateString()}
      </Text>
      <Text style={styles.status}>
        Status: {item.completed ? "Completed" : "Pending"}
      </Text>
    </View>
  );
};

export default SingleTaskComponent;

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
