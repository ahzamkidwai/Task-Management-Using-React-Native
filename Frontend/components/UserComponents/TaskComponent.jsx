import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SingleTaskComponent from "./SingleTaskComponent";
import { darkColors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { PrimaryColors } from "../../constants/colors";

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
        style={{
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 30,
          marginHorizontal: 70,
          marginTop: 30,
          marginBottom: 10,
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
  container: {
    marginVertical: "8%",
    borderWidth: 1,
  },
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
    borderWidth: 0.5,
    borderColor: PrimaryColors.textColor,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: PrimaryColors.textColor2,
    marginHorizontal: 10,
    marginTop: 10,
  },
  addTaskButton: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3,
  },
});
