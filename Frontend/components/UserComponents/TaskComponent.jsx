import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SingleTaskComponent from "./SingleTaskComponent";
import { darkColors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

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
    <View>
      <Text style={styles.heading}>Pending Tasks</Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("createTask");
        }}
      >
        <Button
          mode="contained"
          buttonColor="black"
          textColor="white"
          labelStyle={{ fontSize: 16, fontWeight: "bold" }}
          style={styles.addTaskButton}
        >
          + Add New Task
        </Button>
      </TouchableOpacity>

      <View style={styles.container}>
        {tasks.map((item) => {
          const { backgroundColor, textColor } = getRandomColor();

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
    </View>
  );
};

export default TaskComponent;

const styles = StyleSheet.create({
  container: { marginVertical: "8%", borderWidth: 2, borderColor: "#ddd" },
  taskContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: "4%",
    paddingVertical: "5%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    elevation: 3,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    paddingVertical: 5,
    marginHorizontal: 12,
  },
  addTaskButton: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3,
    width: "50%",
  },
});
