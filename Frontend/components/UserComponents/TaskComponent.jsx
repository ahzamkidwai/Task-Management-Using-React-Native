import { StyleSheet, View } from "react-native";
import SingleTaskComponent from "./SingleTaskComponent";
import { darkColors } from "../../constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

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
            <View style={styles.iconsContainer}>
              <AntDesign name="arrowright" size={24} color={textColor} />
              <Entypo name="edit" size={24} color={textColor} />
              <AntDesign name="delete" size={24} color={textColor} />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default TaskComponent;

const styles = StyleSheet.create({
  container: { marginVertical: "8%" },
  iconsContainer: { flexDirection: "column", gap: 8 },
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
