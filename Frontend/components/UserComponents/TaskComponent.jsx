import { StyleSheet, View } from "react-native";
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
  container: { marginVertical: "8%" },
  taskContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: "3%",
    paddingVertical: "4%",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
