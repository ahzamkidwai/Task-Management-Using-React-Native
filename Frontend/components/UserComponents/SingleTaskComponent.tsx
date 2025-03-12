import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";

const SingleTaskComponent = ({ item, textColor }) => {
  const { token, setTasks } = useContext(AuthContext);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const truncatedDescription =
    item.description.length > 200
      ? item.description.slice(0, 200) + "..."
      : item.description;

  const truncatedDueDate =
    item.dueDate.length > 20 ? item.dueDate.slice(0, 20) + "..." : item.dueDate;

  const truncatedTitle =
    item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title;

  const deleteTaskHandler = async (itemID) => {
    try {
      setDeleteLoading(true);
      const response = await fetch(
        `http://192.168.29.115:3000/api/task/deleteTask/${itemID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      console.log(`Task ${itemID} deleted successfully!`);

      // Optionally remove the deleted task from state
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== itemID));
      setDeleteLoading(false);
    } catch (error) {
      console.log("Error occurred while deleting:", error.message);
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <View style={styles.singleTaskContainer}>
        <Text style={[styles.title, { color: textColor }]}>
          {truncatedTitle}
        </Text>
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
      <View style={styles.iconsContainer}>
        <AntDesign name="arrowright" size={24} color={textColor} />
        <Entypo name="edit" size={20} color={textColor} />
        <TouchableOpacity onPress={() => deleteTaskHandler(item._id)}>
          {deleteLoading ? (
            <ActivityIndicator size="small" color={textColor} />
          ) : (
            <AntDesign name="delete" size={24} color={textColor} />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SingleTaskComponent;

const styles = StyleSheet.create({
  singleTaskContainer: { width: "90%" },
  iconsContainer: {
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
  },
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
