import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { AuthContext } from "@/context/authContext";
import { deleteTaskHandler } from "@/utils/handlers";

const SingleTask = () => {
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();
  const { token, setTasks } = useContext(AuthContext);
  const [deleteLoading, setDeleteLoading] = useState(false);

  if (!item) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No task data available.</Text>
      </View>
    );
  }

  const handleUpdate = () => {
    navigation.navigate("updateTask", { item });
  };

  const handleDelete = (itemId) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          setDeleteLoading(true);
          deleteTaskHandler(itemId, setDeleteLoading, token, setTasks);
          navigation.navigate("home");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.heading}>Task Details</Text>
      </View>

      {/* Task Details */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.taskTitle}>{item.title}</Title>
          <Paragraph style={styles.taskDescription}>
            {item.description}
          </Paragraph>

          <View style={styles.metaItem}>
            <MaterialIcons name="date-range" size={18} color="#bbb" />
            <Text style={styles.metaText}>{item.createdAt || "Unknown"}</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleUpdate}
          style={styles.updateButton}
          disabled={deleteLoading}
        >
          Update
        </Button>
        <Button
          mode="contained"
          onPress={() => handleDelete(item._id)}
          style={styles.deleteButton}
          disabled={deleteLoading}
        >
          {deleteLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            "Delete"
          )}
        </Button>
      </View>
    </View>
  );
};

export default SingleTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    flex: 1,
    marginRight: 30,
  },
  card: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#1E1E1E",
    padding: 15,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  taskDescription: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 15,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  metaText: {
    fontSize: 14,
    color: "#bbb",
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  updateButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#D32F2F",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});
