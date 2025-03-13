import { StyleSheet, Text, View } from "react-native";
import React from "react";

const EmptyTaskComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>No tasks available</Text>
    </View>
  );
};

export default EmptyTaskComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
});
