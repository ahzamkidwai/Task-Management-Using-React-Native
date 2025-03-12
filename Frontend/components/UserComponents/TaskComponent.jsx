import { StyleSheet, View } from "react-native";
import React from "react";
import SingleTaskComponent from "./SingleTaskComponent";
import { darkColors } from "../../constants/colors";

const TaskComponent = ({ tasks }) => {
  const getRandomColor = () => {
    const randomColor =
      darkColors[Math.floor(Math.random() * darkColors.length)];
    return {
      backgroundColor: randomColor.background,
      textColor: randomColor.text,
    };
  };

  return (
    <View style={styles.container}>
      {tasks.map((item) => {
        const { backgroundColor, textColor } = getRandomColor(); // Extract colors

        return (
          <View
            key={item._id}
            style={[styles.taskContainer, { backgroundColor }]} // Apply backgroundColor
          >
            <SingleTaskComponent item={item} textColor={textColor} />
          </View>
        );
      })}
    </View>
  );
};

export default TaskComponent;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    marginVertical: "8%",
  },
  taskContainer: {
    marginHorizontal: 15,
    padding: 20,
    marginVertical: 10,
    borderRadius: 25,
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
    color: "#ddd",
    marginBottom: 5,
  },
  dueDate: {
    fontSize: 12,
    color: "#bbb",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    color: "#d9534f",
  },
});
