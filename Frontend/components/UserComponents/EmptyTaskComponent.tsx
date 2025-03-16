import { Pressable, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { PrimaryColors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const EmptyTaskComponent = () => {
  const navigation = useNavigation();
  const handleAddNewTask = () => {
    navigation.navigate("createTask");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.message}>No tasks available</Text>
      <Pressable style={styles.addNewTaskContainer} onPress={handleAddNewTask}>
        <AntDesign name="plus" size={24} color={PrimaryColors.textColor2} />
        <Text style={styles.addNewText}>Add New Task</Text>
      </Pressable>
    </View>
  );
};

export default EmptyTaskComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
    color: PrimaryColors.textColor,
    marginTop: 40,
  },
  addNewTaskContainer: {
    borderWidth: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: 200,
    gap: 10,
    marginTop: "30%",
    borderColor: PrimaryColors.textColor2,
    borderRadius: 25,
  },
  addNewText: {
    color: PrimaryColors.textColor2,
    fontSize: 20,
    fontWeight: "500",
  },
});
