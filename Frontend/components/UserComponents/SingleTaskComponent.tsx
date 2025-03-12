import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SingleTaskComponent = ({ item, textColor }) => {
  return (
    <View>
      <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
      <Text style={[styles.description, { color: "white" }]}>
        {item.description}
      </Text>
      <Text style={[styles.dueDate, { color: textColor }]}>
        Due Date: {new Date(item.dueDate).toLocaleDateString()}
      </Text>
      <Text style={[styles.status, { color: textColor }]}>
        Status: {item.completed ? "Completed" : "Pending"}
      </Text>
    </View>
  );
};

export default SingleTaskComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginVertical: 5,
  },
  dueDate: {
    fontSize: 12,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
});
