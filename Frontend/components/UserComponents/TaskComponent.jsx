import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SingleTaskComponent from "./SingleTaskComponent";
import { darkColors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const TaskComponent = ({ tasks }) => {
  const navigation = useNavigation();
  const getRandomColor = () => {
    const randomColor =
      darkColors[Math.floor(Math.random() * darkColors.length)];
    return {
      backgroundColor: randomColor.background,
      textColor: randomColor.text,
    };
  };

  return (
    <>
      <Text style={styles.heading}>Pending Tasks</Text>
      <View style={styles.container}>
        {tasks.map((item) => {
          const { backgroundColor, textColor } = getRandomColor(); // Extract colors

          return (
            <TouchableOpacity
              key={item._id}
              style={[styles.taskContainer, { backgroundColor }]}
              onPress={() => {
                navigation.navigate("singleTask", { item });
              }}
            >
              <SingleTaskComponent item={item} textColor={textColor} />
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default TaskComponent;

const styles = StyleSheet.create({
  container: { marginVertical: "8%", borderWidth: 2 },
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
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginTop: 20,
    paddingVertical: 4,
    marginHorizontal: 10,
  },
});
