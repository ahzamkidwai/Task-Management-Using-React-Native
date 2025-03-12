import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SingleTaskComponent = ({ item, textColor }) => {
  // Limit description to max 200 characters and dueDate to 50 characters
  const truncatedDescription =
    item.description.length > 200
      ? item.description.slice(0, 200) + "..."
      : item.description;

  const truncatedDueDate =
    item.dueDate.length > 20 ? item.dueDate.slice(0, 20) + "..." : item.dueDate;

  const truncatedTitle =
    item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title;

  return (
    <View style={styles.singleTaskContainer}>
      <Text style={[styles.title, { color: textColor }]}>{truncatedTitle}</Text>
      <Text style={[styles.description, { color: "white" }]}>
        {truncatedDescription}
      </Text>
      <Text style={[styles.dueDate, { color: textColor }]}>
        Due Date: {truncatedDueDate}
      </Text>
      <Text style={[styles.status, { color: textColor }]}>
        Status: {item.completed ? "Completed" : "Pending"}
      </Text>
    </View>
  );
};

export default SingleTaskComponent;

const styles = StyleSheet.create({
  singleTaskContainer: { width: "90%" },
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
