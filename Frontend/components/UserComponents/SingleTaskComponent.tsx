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
import { deleteTaskHandler } from "../../utils/handlers";
import { useNavigation } from "@react-navigation/native";

const SingleTaskComponent = ({ item, textColor }) => {
  const { token, setTasks } = useContext(AuthContext);
  const navigation = useNavigation();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const truncatedDescription =
    item.description.length > 200
      ? item.description.slice(0, 200) + "..."
      : item.description;

  const truncatedTitle =
    item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title;

  const updateTaskHandler = (item) => {
    navigation.navigate("updateTask", { item });
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

        <Text style={[styles.status, { color: textColor }]}>
          Status: {item.completed ? "Completed" : "Pending"}
        </Text>
      </View>
      <View style={styles.iconsContainer}>
        <AntDesign name="arrowright" size={24} color={textColor} />
        <TouchableOpacity
          onPress={() => {
            updateTaskHandler(item);
          }}
        >
          <Entypo name="edit" size={20} color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            deleteTaskHandler(item._id, setDeleteLoading, token, setTasks)
          }
        >
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
  status: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
});
